import { RingProgress, Text, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import { SyncSession } from "realm";

export function SyncProgress({ syncSession }: { syncSession: SyncSession }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    const upload = (transferred: number, transferable: number) => {
      if (transferred > 0 && transferable > 0) {
        setUploadProgress((transferred / transferable) * 100);
      }
    };

    const download = (transferred: number, transferable: number) => {
      setDownloadProgress((transferred / transferable) * 100);
    };

    if (syncSession) {
      syncSession.addProgressNotification(
        Realm.ProgressDirection.Upload,
        Realm.ProgressMode.ReportIndefinitely,
        upload
      );

      syncSession.addProgressNotification(
        Realm.ProgressDirection.Download,
        Realm.ProgressMode.ReportIndefinitely,
        download
      );
    }

    return () => {
      syncSession.removeProgressNotification(upload);
      syncSession.removeProgressNotification(download);
    };
  }, [syncSession]);

  return (
    <>
      <Tooltip label="Upload progress">
        <RingProgress
          size={36}
          thickness={4}
          label={
            <Text size="xs" ta="center">
              UP
            </Text>
          }
          sections={[{ value: uploadProgress, color: "blue.2" }]}
        />
      </Tooltip>
      <Tooltip label="Download progress">
        <RingProgress
          size={36}
          thickness={4}
          label={
            <Text size="xs" ta="center">
              DL
            </Text>
          }
          sections={[{ value: downloadProgress, color: "blue.2" }]}
        />
      </Tooltip>
    </>
  );
}
