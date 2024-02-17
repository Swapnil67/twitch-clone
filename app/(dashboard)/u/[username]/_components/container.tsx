'use client'

import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import React, { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts';

interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {

  const { collapsed, onExpand, onCollapase } = useCreatorSidebar(
    (state) => state
  );

  const matches = useMediaQuery(`(max-width: 1024px)`);

  // * Automatically collapse and expand sidebar based on user device size
  useEffect(() => {
    if(matches) {
      onCollapase()
    } else {
      onExpand()
    }
  }, [matches, onExpand, onCollapase]);

  return (
    <div className={cn('flex-1', collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60')}>{children}</div>
  )
}

export default Container