import { StoryList } from "./StoryList";

export default {
  title: "components/StoryList",
  component: StoryList,
};

export const Basic = {
  args: {
    setStory: () => {},
    stories: [
      [
        "thing1",
        {
          default: { title: "thing1", component: () => <></> },
          story1: { args: {} },
        },
      ],
      [
        "thing2",
        {
          default: { title: "thing2", component: () => <></> },
          story1: { args: {} },
          story2: { args: {} },
        },
      ],
      [
        "thing3",
        {
          default: { title: "thing3", component: () => <></> },
          story1: { args: {} },
          story2: { args: {} },
        },
      ],
    ],
    selectedStory: "thing1-story1",
  },
};
