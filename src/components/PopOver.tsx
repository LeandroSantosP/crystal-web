import { UserCredentials } from '@/app/admin/ListClient';
import * as Popover from '@radix-ui/react-popover';
import Image from 'next/image';

export const PopOverCustom = ({
  target,
  content,
}: {
  target: any;
  content: UserCredentials;
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{target}</Popover.Trigger>
      <Popover.Anchor />
      <Popover.Portal data-align>
        <Popover.Content className="relative flex h-60 w-60 flex-col justify-center rounded-3xl bg-gray-800 text-gray-800">
          <div className="flex grow-[1] items-center  justify-center  rounded-t-2xl bg-emerald-800">
            <Image
              src={content.avatar_url}
              width={100}
              height={100}
              quality={100}
              alt="Imagem de perfil"
              className="rounded-full"
            />
          </div>

          <Popover.Close />
          <Popover.Arrow className="fill-gray-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
