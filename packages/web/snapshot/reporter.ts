import { FullConfig } from "@playwright/test";
import { FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter";
import * as fs from "fs";

export default class GithubSummaryReporter implements Reporter {
  outputFile?: fs.WriteStream;
  totalCount = 0;
  passedCount = 0;
  errorsCount = 0;

  onBegin(config: FullConfig, suite: Suite) {
    this.outputFile = fs.createWriteStream(`${config.rootDir}/a11y-report.txt`, { flags: "a" });

    this.writeOut("## a11y Test (user)");
    this.writeOut("### Target");
    this.writeOut("- wcag2a");
    this.writeOut("- wcag21a\n");
    this.writeOut("### Results");
    this.writeOut("<details>\n");
    this.writeOut("Case|Status|Error");
    this.writeOut("----|------|-----");
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const title = test.title;
    const linkedTitle = `[${title}](https://storybook.dx-base.com/?path=/story/${title
      .replace(": ", "--")
      .replace(/ |\//g, "-")})`;
    const status = result.status === "passed" ? ":white_check_mark:" : ":x:";

    this.writeOut(`${linkedTitle}|${status}|${result.error?.message || ""}`);

    this.totalCount += 1;
    if (result.status === "passed") {
      this.passedCount += 1;
    } else {
      this.errorsCount += 1;
    }
  }

  onEnd(result: FullResult) {
    this.writeOut(
      `</details>\n\n### Summary\nAll|:white_check_mark: Passed|:x: errors\n----|----|----\n${this.totalCount}|${this.passedCount}|${this.errorsCount}\n`
    );

    if (this.outputFile) {
      this.outputFile.end();
      this.outputFile.close();
    }
  }

  private writeOut(value: string) {
    if (this.outputFile) {
      this.outputFile.write(value + "\n");
    } else {
      console.log(value);
    }
  }
}
