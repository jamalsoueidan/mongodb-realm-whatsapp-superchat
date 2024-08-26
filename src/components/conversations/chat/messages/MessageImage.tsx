import { Image, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Realm from "realm";

import { Message } from "../../../../models/data";
import { CustomModal } from "../../../CustomModal";
import { MessageTime } from "./MessageTime";
import { MessageWrapper } from "./MessageWrapper";

export function MessageImage({
  msg,
}: {
  msg: Message & Realm.Object<Message>;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <MessageWrapper msg={msg}>
        <UnstyledButton onClick={open}>
          <Image
            src={`https://data.mongodb-api.com/app/facebook-ckxlfbp/endpoint/media?id=${msg.media?.file_name}`}
            //src={`${msg.media?.signed_url}`}
            mah={200}
            maw={300}
            loading="lazy"
          />
        </UnstyledButton>
        <MessageTime msg={msg} />
      </MessageWrapper>
      <CustomModal opened={opened} onClose={close} centered>
        <Image
          src={`https://data.mongodb-api.com/app/facebook-ckxlfbp/endpoint/media?id=${msg.media?.file_name}`}
          loading="lazy"
        />
      </CustomModal>
    </>
  );
}
