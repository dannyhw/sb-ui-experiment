import { useState } from "react";
import { Image, Text, TouchableHighlight, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const arrowRight =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACbSURBVHgB5c3BDYJAFIThYaUAS6A07cAQTbztikcDlqAlWdDqM5DAEd6bzV5grpP8H7DqXcOzqpv2gIS5uTPuYlVAXvW99cgBjCtEAouogBREDbCICWAQM2BFKMCC0IAWSQImpHmcsgHDBHvkAkTk1vlLQA5gKZ4EaOI0oI1TgCVuBqxxE8DE1QAb71fOnfFbfpz7HTt/fmOz+wNdE2C6k4CqBQAAAABJRU5ErkJggg==";

const arrowDown =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADcSURBVHgB7ZLBDYIwFIYfr+HOCIwgG9gR3EQSNRpiQuLFRBPZwFFwAxmhI3DXgq8Y0KjUghw89Du9Psr3vzYFsFj+HqcuZpvdGAZkv56fmoBlfPAvKM9UejAITi5dDJJVKFAtt3EoJCs4lTn8DMkZciVXK6zbSbTI7iGOgN44opJHYdZ0XrdM6boYFilA6UMnSO4+Jm8N6BfyWd4a0C2kXa4NMAvRyxUIGhL1ugrkNEb2pqYefQt08mofGEAn8RiTKZQwquVXyTgN8PVZGwU8hRzpB4/kExO5xTIMN5bDYdD1u4JyAAAAAElFTkSuQmCC";

const storyIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAArCAYAAAAOnxr+AAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEISURBVHgB7ZjhDYMgEEavTQdwBEZwo3YEN9ANdCNH6AiM4AjXMyHRUKRgP0xs7yWXKML5BOHHESXAzC2Xo01xuKR0mrNRQS7Cpz5XOgk3yiTl61PIXaXTzKiKolFRNCqKRkXRqCgaFUWjomhUFI2KolFRNCqKRkXR/KeoVGlqCeuipqNZ1wgjfe4Sk1dSbL7JCRfleP203ZMTLipNvSdmXazpc3JCReWykhg9odG1G4mn92y+N7GccFEnYj2RITBu4PfZNqGccFFedvaaLjK2C8jWR4hO3vUjYXzDEQjFRn7LGWflxkoUF51faCgTDv/bxURHiYp2woETgVDwsiEGAsHLidDRL/EC6UrLx77VqdAAAAAASUVORK5CYII=";

const boxIcon =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHUSURBVHgB7ZjRUcIwAIb/pIXjkREYAScQJtANxFN81Q2oI/CqcOAEjoBuwAgdoY8eksSkLbQNqQLXFnvke0qakHwlbZr7AcuZQn5rdKbrAQS9ERBdWW2jHAICsgThb+zOned1Moq2ZqKzYuIdkWCV+E2H9r9uia837IiGkpwvINDBaTDKunovTTKA4OOm685Nd6lDX5knb30UVgSe+dDx/vpN42XVZYRcg9BRfCleTVxkxk5XomcykeSc9fmw4e0jeSzfD82lmsPhTIkF0VXRDV3yRNWLk5T5GHIQVIQSln/SGCYXaKIi9fJwN/8NLAvu0jkMLgqq9U22oBKXO5fsnJntkKImWNGisaJFY0WLpjaibl5DeMA4EELIpfyibMvHjJE7drpCJ0zgH8Hvna1f/ZdenSdxIPHS98IyyIcQ4hOHsjnPauSK7nPo1YkPzj1VVpJHjTFhRlG7PRWNFS0aK1o0VrRodNFgW5LRDiqmlZ0zSLdlRMNUbdOw5gNUzIrhCgaX0CfTU0Z/SRmPKhdCRURzcQ8mF2iiYT5J4MfVNqPOQn6/n1olPgbtmWjTqRipuZCEDr6ele7mo1KKnjh25DJ21JMac+J8OlmjpKI20bjlbPkBgg7EtII/AFIAAAAASUVORK5CYII=";

export const StoryListItem = ({
  selectStory,
  title,
  stories,
  selectedStory,
}: {
  selectStory: (id: string) => void;
  title: string;
  stories: Array<string>;
  selectedStory: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setExpanded(!expanded);
        }}
        activeOpacity={0.6}
        style={{
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 5,
          columnGap: 10,
        }}
      >
        {expanded ? (
          <Image
            source={{
              uri: arrowDown,
              width: 8,
              height: 8,
            }}
          />
        ) : (
          <Image
            source={{
              uri: arrowRight,
              width: 8,
              height: 8,
            }}
          />
        )}

        <Image
          source={{
            uri: boxIcon,
            width: 12,
            height: 12,
          }}
        />

        <Text
          style={{
            fontSize: 16,
            color: "#2E3438",
            fontWeight: "400",
            lineHeight: 16,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>

      {expanded &&
        stories.map((story) => {
          const selected = selectedStory === `${title}-${story}`;

          return (
            <TouchableOpacity
              key={story}
              style={{
                paddingLeft: 44,
                flexDirection: "row",
                alignItems: "center",
                columnGap: 10,
                padding: 10,
                backgroundColor: selected ? "#029CFD" : undefined,
              }}
              onPress={() => selectStory(`${title}-${story}`)}
            >
              <Image
                source={{ uri: storyIcon, width: 14, height: 14 }}
                style={{ tintColor: selected ? "white" : "#37D5D3" }}
              />

              <Text
                style={{ color: selected ? "white" : "#2E3438", fontSize: 16 }}
              >
                {story}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};
