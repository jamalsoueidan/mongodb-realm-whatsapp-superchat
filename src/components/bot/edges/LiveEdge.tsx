import { ActionIcon } from "@mantine/core";
import { IconCheck, IconLoader2 } from "@tabler/icons-react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from "@xyflow/react";
import { useMemo } from "react";
import { InteractiveTrigger } from "../NodeWrapper";

export function LiveEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  target,
  markerEnd,
}: EdgeProps) {
  const { getNode } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const data = getNode(target)?.data as InteractiveTrigger;

  const color = useMemo(() => {
    const trigger = data.trigger;
    if (trigger) {
      if (trigger.status === "done") {
        return "var(--mantine-color-green-7)";
      }
      return "var(--mantine-color-yellow-4)";
    }
    return "#CCC";
  }, [data]);

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{ strokeWidth: 3, stroke: color }}
      />
      <EdgeLabelRenderer>
        {data.trigger && (
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
            className="nodrag nopan"
          >
            <ActionIcon variant="filled" color={color} size="sm" radius="xl">
              {color === "var(--mantine-color-green-7)" ? (
                <IconCheck />
              ) : (
                <IconLoader2 />
              )}
            </ActionIcon>
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
}
