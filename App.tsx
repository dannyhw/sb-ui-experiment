import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { useMemo, useRef, useState } from "react";
import { BottomSheet } from "./components/BottomSheet";
import { TabButton } from "./components/TabButton";
import "./types/metro-require.d.ts";
import { SearchBar } from "./components/SearchBar";
import { StoryList } from "./components/StoryList";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <Content />
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

type ModuleExports = { [exportName: string]: any };
type StoryTitle = string;

const req = require.context("components", true, /\.stories\.tsx$/);

let storiesMap = new Map<StoryTitle, ModuleExports>();

req.keys().forEach((filename: string) => {
  try {
    const fileExports = req(filename) as ModuleExports;

    storiesMap.set(fileExports.default.title, fileExports);
  } catch (e) {}
});

let firstModule = "";
const entries = Array.from(storiesMap.entries());

if (entries.length) {
  const [title, exports] = entries[0];
  const namedExports = Object.keys(exports).filter((key) => key !== "default");
  firstModule = `${title}-${namedExports[0]}`;
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    columnGap: 12,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

const icons = {
  stories:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAwCAYAAAC4wJK5AAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHQSURBVHgB7ZnNTcNAEIXfzCaIG+kA00HoIOmAEoj4uQId0AHiyo8MHaQD0kFSgukgwAUl8QxrESLH6yQcwF5F+12S9czK8zwjS94HBAJ/Bm1KaNxrRyBtZuwr0EJF2MLGIng1yoPpOY025JazG2s0TTVWaAc1Q6B+09DVZ4+S8ngJmYCJyAsUEfwh2THcLRPiiGjF2noXGToCCAmqxn2IiRg+RI/G+YuN4r4PSY+gtNhsWzlIDfWwopX/ip0Ik+qNHemj+ZWIZ3IpwHU+zekEP6RD+9OeLxM5NQeoEzsZvDwZTk1csq29+Ke4Rd1koyNLdUTFlGURtn35JbGO4QFOHYU6GVtAEOELQYQvBBG+EET4QhDhC0GELwQRvrAVIhrrgqoU28/VGDWjuj4exskX1o4TkfbSk8YTasY8zo6z0V4VD+PkC0GELwQRvrCFIgrH9ypUmb21DqeOQp1uJ/JmCuEiO1pH3bCtY4Hr37kiBM+5VWZyxLuFU+iqyO5rHgq2m+pzMc/17FxT4yczQdX80u4qd0/tE2APjUcroFtmu5W/nWyiMHetV9aHB2S+4SoB3/ENNO8m7ZRMByQREe+hIlTlDcoJQ0azs+YAgUA1fAFvKKwRkaILIwAAAABJRU5ErkJggg==",
  addons:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMYSURBVHgB7ZnLcRpBEIa7Z8HlkwtHYDKwMjDKQBkIlSVf5QwQGZirHgVkoAwgAykDEQIlX1yI6Xb3iqX2xc4su0vZVfwHChZm5oOdfswPQs1q3XGPkQcM3EOECZKZrq9wDjUIoSbFIbOLCCzS1H5vTaCCKsF2xtz5TfaM2VwD8InHkAUiD/eF3gtWIV8JroHpp75Mvb2UWR8N0ZQQ+7LEec4UIXTbBPM/F7gAT5WCdUIyjajV+gUXuNxeHXPXWHsDiN+AoQsZaJi3jRn6QHvBtm/5hAK6ZoYzb8i0BDog22PAQQ40aDC6oAthi4JGhj4j0sia4LEQMkfBw7pfBL0rg2BZSI1sZDtcX7XnUFEKDWzOfTPIFtYV2XVCptW6e+u5glGhQ9iPsp9WRLOc2xJGdmDt6O3Hh2doWlEw7oLWR3On0QqD1JtLCYjTg0Cm1L5dnUgszCAVzKZgTEcGPAUPdqy/PBxAmnV0vTxQlXFNIOmqv7L0opNo4EED0nmDe5pZQ0+6HiRBt5kmC8swlA19EUYjJKEJaaaThlFcI6TOm84Iur5hOhWe0W5YkUaevTSn4YeBp5D4LpLWGMfm3r7sA61ZR8eZe3oqgtT105mnVTTx5sNzidKbnCjtbqAHPnU+KtWvVks1dvRrx+SVdQphtxIIAtlLEXSyzofQsq8Xsq8zdT4JWVyqyYHhB5uFzqvz3U0w9gU6LJls6FwgHf1E4F2qy8HGoC3ARJ5N8uq8QjNSP3mnVfF+wh+yGmxMm9o9cdX5Okp1ZdhIEfR7nTez6LpGdl39hLMolFUarM7Gp3bYJnWEbUpH2KZ0hG1K/zcsGvhyqGOMS9qxIeLX6HUGdtM5zQ559kpLIc0DD6Rje5Fe4yy6/u4b6BE4/yjuZeukJQ35tt+iy8DbT3PYVIvERPvaOlVhfW2q3InK2jr7wpa1qRzGnJ+tAyVgq9hUfvvJZeukDox5sD4GtOvAWM759jSG1RSJLn4KzOfSBnQtsDHoImM4A1QRMlLlf2uKMkjOcnsb0OFoqEmHODDWBhspnkGaNKD/ef0FHAeIz2CIZ58AAAAASUVORK5CYII=",
  menu: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACiSURBVHgB7dbRCcIwEIDhSxRxjKziJoqL1El0E1fJGFLkog1UfLEW2pCD/N9TAnk48vBzIgDa4sbD/ppCr3qXJEFsibuNP/jx1j/1aHDIQRhm+wyqW397/28Ue2KeDUBjagc/x/xxcvHfw9rBzzGf87B28Ik5gB8sbfiT8be04U/G39KGT/wBfCkffOc7PbuLLFQ++Ek7WUH54Cdd/JsAWvQCj8NXnr70hiwAAAAASUVORK5CYII=",
};

const Content = () => {
  const [currentComponent, setCurrentComponent] = useState<string>(firstModule);

  const { Component, props } = useMemo(() => {
    if (currentComponent) {
      const [title, exportName] = currentComponent.split("-");
      const kind = storiesMap.get(title);
      const story = kind?.[exportName];
      return {
        Component: kind?.default?.component,
        props: story?.args,
      };
    }
    return {
      Component: null,
      props: {},
    };
  }, [currentComponent]);

  const storiesBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const addonsBottomSheetModalRef = useRef<BottomSheetModal>(null);

  const menuSheetModalRef = useRef<BottomSheetModal>(null);

  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, marginTop: insets.top }}>
      <StatusBar style="auto" />

      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          {Component && <Component {...props} />}
        </View>

        <View
          style={[
            styles.shadow,
            {
              backgroundColor: "#fff",
              paddingBottom: insets.bottom + 8,
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <TabButton
            text="Stories"
            onPress={() => storiesBottomSheetModalRef.current?.present()}
            icon={icons.stories}
            style={{ flex: 1 }}
          />

          <TabButton
            text="Addons"
            onPress={() => addonsBottomSheetModalRef.current?.present()}
            icon={icons.addons}
            style={{ flex: 1 }}
          />

          <TabButton
            text="Menu"
            onPress={() => menuSheetModalRef.current?.present()}
            icon={icons.menu}
            style={{ flex: 1 }}
          />
        </View>
      </View>

      <BottomSheet stackBehavior="replace" ref={storiesBottomSheetModalRef}>
        <View style={{ rowGap: 16 }}>
          <SearchBar style={{ marginHorizontal: 16 }} />

          <StoryList
            setStory={setCurrentComponent}
            stories={Array.from(storiesMap.entries())}
            selectedStory={currentComponent}
          />
        </View>
      </BottomSheet>

      <BottomSheet
        stackBehavior="replace"
        snapPoints={["30%", "50%", "75%"]}
        backdropComponent={null}
        ref={addonsBottomSheetModalRef}
        style={[
          styles.shadow,
          {
            rowGap: 16,
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 8,
          },
        ]}
      >
        <Text>addons</Text>
      </BottomSheet>

      <BottomSheet
        stackBehavior="replace"
        ref={menuSheetModalRef}
        style={{ rowGap: 16, alignItems: "center" }}
      >
        <Text>menu</Text>
      </BottomSheet>
    </View>
  );
};
