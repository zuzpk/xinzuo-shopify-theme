"use client"
import { asset } from '@/core';
import { css, Flex, Icon, Image, Text } from '@zuzjs/ui';

interface HeroContext {
  heading?: string;
  subheading?: string;
  primary_cta_text?: string;
  primary_cta_url?: string;
  secondary_cta_text?: string;
  secondary_cta_url?: string;
  background_image?: string;
}

interface HeroProps {
  context?: HeroContext;
}

const Landing = ({ context: _context } : HeroProps) => {
  void _context;


    return <Flex cols as={`w:full h:200vh rel`} timelineRoot>
        
        {/* Hero */}
        <Flex as={`--hero w:full h:calc[100vh - 80px] sticky top:-30`}>
        
          <Flex cols jcc aie as={`flex:1 h:full`}>
            

            <Text tfx={`fog`} as={`s:7xl lh:0.9 bgi:gradient-to-top-#fff-$surface text-clip bold`}>Premium</Text>
            <Text tfx={`fog`} as={`s:6xl lh:0.9 bgi:gradient-to-top-#fff-$surface text-clip bold`}>Kitchen Knives</Text>
            <Text tfx={`fog`} as={`s:2xl mt:30 bgi:gradient-to-top-#fff-$surface text-clip`}>Japanese & Damascus Steel. Shipped from Australia.</Text>

            <a href={`/`} className={css(`tdn --button --lg mt:30 c:$text-primary-inverted! bold flex aic gap:10`)}>
              <Text as={`bold`}>Shop All</Text>
              <Icon name={`arrow-forward-outline`} />
            </a>
            
          </Flex>

          <Flex as={`flex:1 h:full rel`}>
            <Image src={asset(`black-friday-up.png`)} as={`abs h:90vh bottom:0 left:0 zIndex:0`} />
          </Flex>

        </Flex>

        {/* Hero 2 */}
        <Flex aic jcc 
          // timeline={{
          //     id: `hero2`,
          //     entry: { delay: 0.25, y: [`110vh`, `0vh`, `$spring`] },
          //     keyframes: [
          //         {
          //             id: `hero2-1`,
          //             start: 0,
          //             end: 0.4,
          //             rotate: [`-15deg`, `0deg`],
          //             // opacity: [0.9, 1],
          //             // y: [`0vh`, `-35vh`, `$spring`]
          //         }
          //     ]
          // }}
          as={`--hero w:100vw h:100vh sticky top:0 bgc:$surface --bg-grid`}>

            <Image 
              src={asset(`X06-CS-t.png`)} 
              as={`abs abc zIndex:1`}
              timeline={{
                id: `hero2-knife`,
                keyframes: [
                    {
                      trigger: `timeline`,
                      id: `hero2-knife-1`,
                      start: 0.1,
                      end: 0.6,
                      y: [`0vw`, `-25vw`],
                      rotate: [`0deg`, `0deg`],
                    },
                    {
                      trigger: `timeline`,
                      id: `hero2-knife-2`,
                      start: 0.6,
                      end: 1,
                      y: [`-25vw`, `-5vw`],
                      rotate: [`0deg`, `50deg`],
                    },
                ]
            }} />
            <Image 
              src={asset(`B37-CS-t.png`)} 
              as={`abs right:0vw top:0 zIndex:1`}
              timeline={{
                id: `hero2-knife2`,
                keyframes: [
                    {
                      trigger: `timeline`,
                      id: `hero2-knife2-1`,
                      start: 0.2,
                      end: 0.7,
                      y: [`0vw`, `-25vw`],
                      rotate: [`0deg`, `0deg`],
                    },
                    {
                      trigger: `timeline`,
                      id: `hero2-knife2-2`,
                      start: 0.7,
                      end: 1,
                      y: [`-25vw`, `-5vw`],
                      rotate: [`0deg`, `40deg`],
                    },
                ]
            }} />

            <Flex cols as={`abs bottom:0 center-x`}>
              <Text as={[
                `s:clamp[5rem, 7cqi, 10rem] w:100vw`,
                `bgi:gradient-to-top-#fff-$surface text-clip`
              ]}>Trusted by Michelin</Text>
              <Text as={[
                `s:clamp[5rem, 7cqi, 10rem] w:100vw`,
                `bgi:gradient-to-top-#fff-$surface text-clip`
              ]}>Star Chefs Worldwide</Text>
            </Flex>

        </Flex>

    </Flex>
}

export default Landing