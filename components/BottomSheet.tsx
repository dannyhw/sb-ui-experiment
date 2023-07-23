import { forwardRef } from "react";

import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";

const BottomSheetBackdropComponent = (
  backdropComponentProps: BottomSheetBackdropProps
) => (
  <BottomSheetBackdrop
    {...backdropComponentProps}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    opacity={0.2}
  />
);

interface BottomSheetProps extends Omit<BottomSheetModalProps, "snapPoints"> {
  snapPoints?: string[];
}

export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ children, snapPoints = ["75%"], ...props }, bottomSheetRef) => {
    return (
      <BottomSheetModal
        handleIndicatorStyle={{ backgroundColor: "lightgray", width: 64 }}
        snapPoints={snapPoints}
        enableDismissOnClose
        enablePanDownToClose
        enableHandlePanningGesture
        enableContentPanningGesture
        stackBehavior="replace"
        ref={bottomSheetRef}
        backdropComponent={BottomSheetBackdropComponent}
        {...props}
      >
        {children}
      </BottomSheetModal>
    );
  }
);
