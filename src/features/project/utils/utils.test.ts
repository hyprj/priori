import { ISection } from "../../../types/types";
import { describe, expect, it } from "vitest";
import { getUpdatedItems, sortByOrder, updateOrdersFromOrder } from "./utils";

describe("updateOrdersFromOrder", () => {
  it("should update orders from order", () => {
    const items = [
      { id: "1", order: 0 },
      { id: "2", order: 1 },
      { id: "3", order: 2 },
    ] as ISection[];

    const order = 1;

    const result = [
      { id: "2", order: 2 },
      { id: "3", order: 3 },
    ] as ISection[];

    const functionResult = sortByOrder(updateOrdersFromOrder(items, order));

    expect(functionResult).toEqual(result);
  });

  it("should update orders from order 0", () => {
    const items = [
      { id: "1", order: 0 },
      { id: "2", order: 1 },
      { id: "3", order: 2 },
    ] as ISection[];

    const order = 0;

    const result = [
      { id: "1", order: 1 },
      { id: "2", order: 2 },
      { id: "3", order: 3 },
    ] as ISection[];

    const functionResult = sortByOrder(updateOrdersFromOrder(items, order));

    expect(functionResult).toEqual(result);
  });

  it("should update last order", () => {
    const items = [
      { id: "1", order: 0 },
      { id: "2", order: 1 },
      { id: "3", order: 2 },
    ] as ISection[];

    const order = 2;

    const result = [{ id: "3", order: 3 }] as ISection[];

    const functionResult = sortByOrder(updateOrdersFromOrder(items, order));

    expect(functionResult).toEqual(result);
  });
});

describe("getUpdatedItems", () => {
  it("should return an empty array if there are no updated items", () => {
    const tasks = [
      { id: "1", order: 0 },
      { id: "2", order: 1 },
    ];
    const updatedTasks = [
      { id: "1", order: 0 },
      { id: "2", order: 1 },
    ];

    expect(getUpdatedItems(tasks, updatedTasks)).toEqual([]);
  });

  it("should return both items due to order replace", () => {
    const tasks = [
      { id: "1", order: 0 },
      { id: "2", order: 1 },
    ];
    const updatedTasks = [
      { id: "1", order: 1 },
      { id: "2", order: 0 },
    ];

    expect(getUpdatedItems(tasks, updatedTasks)).toEqual(updatedTasks);
  });

  it("should return last item due to name change", () => {
    const tasks = [
      { id: "1", order: 0 },
      { id: "2", order: 1 },
      { id: "3", order: 2, name: "oldname" },
    ];
    const updatedTasks = [
      { id: "1", order: 0 },
      { id: "2", order: 1 },
      { id: "3", order: 2, name: "newname" },
    ];

    expect(getUpdatedItems(tasks, updatedTasks)).toEqual([
      { id: "3", order: 2, name: "newname" },
    ]);
  });
});
