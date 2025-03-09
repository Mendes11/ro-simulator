import { ItemLocations, ItemSubTypes } from "@/types/equipment";

type PositionState = {
    inUseByPosition?: keyof PositionsState;
    allowedSubTypes: ItemSubTypes[];
    location: ItemLocations;
}

export type PositionsState = {
  top: PositionState;
  mid: PositionState;
  bottom: PositionState;
  armor: PositionState;
  rightHand: PositionState;
  leftHand: PositionState;
  garment: PositionState;
  shoes: PositionState;
  rightAccessory: PositionState;
  leftAccessory: PositionState;
}
