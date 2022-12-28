import React, { PropsWithChildren, useContext } from 'react';

import type { UserResponse } from 'stream-chat';

import type { DefaultStreamChatGenerics } from '../../types/types';

export type FormatAvatar<
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics,
> = (user?: UserResponse<StreamChatGenerics> | null) => string | undefined;
export type FormatName<
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics,
> = (user?: UserResponse<StreamChatGenerics> | null) => string | undefined;

export type FormatContextValue<
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics,
> = {
  readonly formatAvatar: FormatAvatar<StreamChatGenerics>;
  readonly formatName: FormatName<StreamChatGenerics>;
};

export const FormatContext = React.createContext<FormatContextValue>({
  formatAvatar: (user?: UserResponse<DefaultStreamChatGenerics> | null) => user?.image,
  formatName: (user?: UserResponse<DefaultStreamChatGenerics> | null) =>
    user?.name || user?.username || user?.id,
});

export const FormatProvider = <
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics,
>({
  children,
  value,
}: PropsWithChildren<{ value: FormatContextValue<StreamChatGenerics> }>) => (
  <FormatContext.Provider value={value as unknown as FormatContextValue}>
    {children}
  </FormatContext.Provider>
);

export const useCustomFormat = <
  StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics,
>() => useContext(FormatContext) as unknown as FormatContextValue<StreamChatGenerics>;
