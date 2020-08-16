import React from 'react';

import './Avatar.scss';

interface IAvatarProps {
  avatar: string;
}

export const Avatar = ({ avatar }: IAvatarProps) => (
  <div className="avatar">
    <img src={avatar} className="avatar-icon" alt="user avatar" />
  </div>
);
