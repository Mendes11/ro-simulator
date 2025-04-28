import { ItemSubTypes } from "@engine/types/equipment";
import { ItemLocations } from "@/engine/types/enums";

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
