import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";

import { Divider, DividerProps } from "./Divider";

const defaultArgs: DividerProps = {};

type Story = StoryObj<DividerProps>;

const meta: Meta<DividerProps> = {
  title: "ui/Divider",
  component: Divider,
  args: defaultArgs,
};
export default meta;

const SampleTemplate: StoryFn<DividerProps> = (args) => (
  <div className="p-4">
    <div className="pb-4">
      <Divider fontWeight="bold" textAlign="center" />
    </div>
    <div className="pb-4">
      <Divider fontWeight="bold" textAlign="center" line="dotted" />
    </div>
    <div className="pb-4">
      <Divider fontWeight="bold" textAlign="center">
        あれこれ動作確認するところ
      </Divider>
    </div>
    <div className="pb-4">
      <Divider textAlign="center" line="dotted">
        １２３４５６７８９０１２３４
      </Divider>
    </div>
    <div className="pb-4">
      <Divider fontWeight="bold" textAlign="left">
        １２３４５６７８９０１２３４
      </Divider>
    </div>
    <div className="pb-4">
      <Divider textAlign="left" line="dotted">
        １２３４５６７８９０１２３４
      </Divider>
    </div>
    <div className="pb-4">
      <Divider fontWeight="bold" textAlign="right">
        １２３４５６７８９０１２３４
      </Divider>
    </div>
    <div className="pb-4">
      <Divider fontWeight="bold" textAlign="right">
        １２３４５６７８９０１２３４
      </Divider>
    </div>
    <div className="pb-4">
      <Divider fontWeight="bold" textAlign="left">
        最小幅でアイコン有無に関わらず
        <br />
        14文字以内って感じかな
      </Divider>
    </div>
    <div className="pb-4">
      <Divider textAlign="left" line="dotted">
        2行にしてもいいが
        <br />
        改行位置は各自指定する
      </Divider>
    </div>
    <div className="pb-4">
      <Divider fontWeight="bold" textAlign="right">
        右寄せ使うのかな
      </Divider>
    </div>
    <div className="pb-4">
      <Divider textAlign="right" line="dotted">
        まだわからんな
      </Divider>
    </div>
    <div className="pb-4">
      <Divider fontWeight="bold" textAlign="center">
        １２３４５６７８９０１２３４
      </Divider>
    </div>
    <div className="pb-4">
      <Divider textAlign="center" line="dotted">
        １２３４５６７８９０１２３４
      </Divider>
    </div>
    <div className="pb-4">
      <Divider fontWeight="bold" textAlign="center">
        2行にしてもいいが
        <br />
        改行位置は各自指定する
      </Divider>
    </div>
    <div className="pb-4">
      <Divider textAlign="center" line="dotted">
        線が見えなくなるような
        <br />
        テキスト量は入れないこと
      </Divider>
    </div>
  </div>
);

export const Basic: Story = {
  render: SampleTemplate,
};
