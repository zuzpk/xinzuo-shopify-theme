"use client"
import { asset } from '@/core';
import { css, Flex, Icon, Image, Position, ToolTip } from '@zuzjs/ui';
import React from 'react';

interface LinkItem {
  title: string;
  url: string;
}

interface HeaderProps {
  context?: {
    menu_links?: LinkItem[];
    logo_text?: string;
    cart_count?: number;
  };
}

const nav = [
  { label: `Shop by Series`, img: `series.webp`, href: `/series` },
  { label: `Shop by Type`, img: `type.webp`, href: `/type` },
  { label: `Accessories`, img: `accessories.webp`, href: `/accessories` },
  { label: `Top Picks`, img: `top-picks.webp`, href: `/top-picks` },
  { label: `Knife Sets`, img: `sets.webp`, href: `/new-arrivals` },
]

const actionNav = [
  { label: `Account`, icon: `user`, href: `/account` },
  { label: `Cart`, icon: `shopping-cart`, href: `/cart` },
  { label: `Search`, icon: `search-normal-1`, href: `/search` },
]

const Header : React.FC<HeaderProps> = ({ context }) => {
    
    const logoAlt = context?.logo_text || 'ZUZJS KNIVES';
    
    return <Flex as={`w:full h:80 ph:30 zIndex:99 sticky top:0 --header`}>
      
      <Flex aic>
        <Image src={asset('xz-logo.png')} alt={logoAlt} as={`h:30`} />
      </Flex>

      <Flex as={`flex:1 --app-nav`} aic jcc>
          <Flex aic jcc gap={15} as={`bg:$surface h:30 p:5,20 r:$radius-md --round`}>
            {nav.map((item) => <ToolTip margin={8} key={item.href} title={item.label} position={Position.Bottom}> <a 
              key={item.href} 
              href={item.href} 
              className={css([
                `tdn c:$text-primary &hover(c:$text-primary-hover) flex aic jcc gap:5`,
                `--tooltip-anchor rel`,
                `&hover( .--img( scale:1.2 ) )`
              ])}>
                <Image src={asset(item.img)} as={`--img anim:0.4s,$bounce w:55 filter:shadow[0,0,0,0.2]`} />
                {/* <Text as={`bg:$surface s:sm bold c:$text-primary p:2 abs bottom:0 center-x white-space-pre`}>{item.label}</Text> */}
              </a> </ToolTip>)} 
          </Flex>
      </Flex>

      <Flex aic gap={25}>
        {actionNav.map((item) => <ToolTip key={item.href} title={item.label}> 
          <a href={item.href} className={css(`tdn c:$text-primary flex aic gap:5 --tooltip-anchor`)}>
            <Icon name={item.icon} as={`s:lg`} />
          </a>
        </ToolTip>)}
      </Flex>
       

    </Flex>
}

export default Header;