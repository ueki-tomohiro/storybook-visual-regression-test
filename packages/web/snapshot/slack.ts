import { FullConfig } from "@playwright/test";
import { FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter";
import * as fs from "fs";

export default class SlackReporter implements Reporter {
  outputFile?: fs.WriteStream;
  totalCount = 0;
  passedCount = 0;
  errorsCount = 0;

  onBegin(config: FullConfig, suite: Suite) {
    this.outputFile = fs.createWriteStream(`${config.rootDir}/a11y-comment.json`, { flags: "w" });

    this.writeOut(`{ "blocks": [`);
    this.writeTitle("A11y Test Results");
    this.writeDivider();
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const status = result.status === "passed" ? ":white_check_mark:" : ":x:";
    this.writeResult({ title: test.title, status, message: result.error?.message || "" });

    this.totalCount += 1;
    if (result.status === "passed") {
      this.passedCount += 1;
    } else {
      this.errorsCount += 1;
    }
  }

  onEnd(result: FullResult) {
    this.writeDivider();
    this.writeSummary({
      totalCount: this.totalCount.toString(),
      passedCount: this.passedCount.toString(),
      errorsCount: this.errorsCount.toString(),
    });
    this.writeOut("]}");

    if (this.outputFile) {
      this.outputFile.end();
      this.outputFile.close();
    }
  }

  private writeTitle(value: string) {
    this.writeOut(` {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "${value}",
        "emoji": true
      }
    },`);
  }

  private writeResult({ title, status, message }: { title: string; status: string; message: string }) {
    this.writeOut(` {
      "type": "context",
      "elements": [
				{
					"type": "mrkdwn",
					"text": "${title}"
				},
				{
					"type": "mrkdwn",
					"text": "${status}"
				}`);
    if (message) {
      this.writeOut(`,{
            "type": "mrkdwn",
            "text": "${message}"
          }`);
    }
    this.writeOut(` ] },`);
  }

  private writeSummary({
    totalCount,
    passedCount,
    errorsCount,
  }: {
    totalCount: string;
    passedCount: string;
    errorsCount: string;
  }) {
    this.writeOut(` {
    "type": "context",
    "elements": [
      {
        "type": "mrkdwn",
        "text": "*Summary*"
      },
      {
        "type": "mrkdwn",
        "text": "${totalCount}"
      },
      {
        "type": "mrkdwn",
        "text": "${passedCount}"
      },
      {
        "type": "mrkdwn",
        "text": "${errorsCount}"
      }
    ]
  },`);
  }

  private writeDivider() {
    this.writeOut(`  {
      "type": "divider"
    },`);
  }

  private writeOut(value: string) {
    if (this.outputFile) {
      this.outputFile.write(value);
    } else {
      console.log(value);
    }
  }
}
