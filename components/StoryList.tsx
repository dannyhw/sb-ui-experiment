import { View } from "react-native";
import { StoryListItem } from "./StoryListItem";

export const StoryList = ({
  setStory,
  stories,
  selectedStory,
}: {
  setStory: (id) => void;
  stories: Array<[title: string, exports: { [exportName: string]: any }]>;
  selectedStory: string;
}) => (
  <View style={{ rowGap: 8 }}>
    {stories.map(([title, exports]) => (
      <StoryListItem
        selectStory={setStory}
        stories={Object.keys(exports).filter((k) => k !== "default")}
        title={title}
        key={title}
        selectedStory={selectedStory}
      />
    ))}
  </View>
);
