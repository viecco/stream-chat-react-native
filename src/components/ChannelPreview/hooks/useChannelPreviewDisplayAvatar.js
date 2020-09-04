import { useContext, useEffect, useState } from 'react';

import { ChatContext } from '../../../context';

/**
 * Hook to set the display avatar for channel preview
 * @param {*} channel
 *
 * @returns {object} e.g., { image: 'http://dummyurl.com/test.png', name: 'Uhtred Bebbanburg' }
 */
export const useChannelPreviewDisplayAvatar = (channel) => {
  const { client } = useContext(ChatContext);
  const [displayAvatar, setDisplayAvatar] = useState(
    getChannelPreviewDisplayAvatar(channel, client),
  );

  useEffect(() => {
    setDisplayAvatar(getChannelPreviewDisplayAvatar(channel, client));
  }, [channel]);

  return displayAvatar;
};

const getChannelPreviewDisplayAvatar = (channel, client) => {
  const currentUserId = client && client.user && client.user.id;
  const channelName = channel && channel.date && channel.data.name;
  const channelImage = channel && channel.data && channel.data.image;

  if (channelImage) {
    return {
      image: channelImage,
      name: channelName,
    };
  } else if (currentUserId) {
    const members = Object.values(
      (channel && channel.state && channel.state.members) || {},
    );
    const otherMembers = members.filter(
      (member) => member.user.id !== currentUserId,
    );

    if (otherMembers.length === 1) {
      return {
        image: otherMembers[0].user.image,
        name: channelName || otherMembers[0].user.name,
      };
    }
  }
  return {
    name: channelName,
  };
};
