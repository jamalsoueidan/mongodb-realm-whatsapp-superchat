import { Handle, HandleProps, useHandleConnections } from "@xyflow/react";

export const CustomHandle = ({
  multiHandlers,
  ...props
}: HandleProps & { multiHandlers: boolean }) => {
  const connections = useHandleConnections({
    type: props.type,
    ...(multiHandlers ? { id: props.id } : {}),
  });

  return <Handle {...props} isConnectable={connections.length < 1} />;
};
