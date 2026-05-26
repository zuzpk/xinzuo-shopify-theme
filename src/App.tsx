import createStore from "@zuzjs/store";
import { setZuzMap, SPINNER, ThemeProvider, TimelineProvider, TRANSITION_CURVES, TRANSITIONS, Variant } from "@zuzjs/ui";
import Footer from "./comps/Footer";
import Header from "./comps/Header";
import Landing from "./comps/Landing";
import { zuzMap } from "./css/zuzmap";
import { AppStore, Store } from "./store";

setZuzMap(zuzMap)

export interface ThemeSectionContext {
  section_type?: string;
  // Header Data settings mapping properties
  logo_text?: string;
  cart_count?: number;
  menu_links?: Array<{ title: string; url: string }>;
  // Hero Banner properties
  heading?: string;
  subheading?: string;
  primary_cta_text?: string;
  primary_cta_url?: string;
  secondary_cta_text?: string;
  secondary_cta_url?: string;
  background_image?: string;
}

interface AppProps {
  context?: ThemeSectionContext;
}

export default function App({ context }: AppProps) {
  return (
    <MasterProvider>
        <Frontend context={context} />
    </MasterProvider>
  );
}

const appStore = createStore(Store.App, { ...AppStore.App });

export const MasterProvider = ({ children }: { children: React.ReactNode }) => {
  const { Provider } = appStore;

  return (
    <Provider>
      <ThemeProvider
      zuzMap={zuzMap}
      variant={Variant.Medium}
      group={{
        fx: {
          transition: TRANSITIONS.SlideInBottom,
          curve: TRANSITION_CURVES.Liquid
        },
        fxStep: 0.1,
        fxDelay: 0.1
      }}
      spinner={{
        type: SPINNER.Roller
      }}
      toast={{
        curve: TRANSITION_CURVES.Liquid
      }}
      drawer={{
        margin: 20,
        speed: .3
      }}
      dialog={{
        transition: TRANSITIONS.SlideInBottom,
        curve: TRANSITION_CURVES.Liquid,
        speed: 0.5
      }}
      squircle={true}>
        {children}
      </ThemeProvider>
    </Provider>
  );
}

export const Frontend = ({ context } : AppProps) => {

  const hasHeroShape =
    Boolean(context?.heading) ||
    Boolean(context?.subheading) ||
    Boolean(context?.primary_cta_text) ||
    Boolean(context?.secondary_cta_text) ||
    Boolean(context?.background_image);

  if ( context?.section_type === 'header' ) {
    return <Header context={context} />
  }
  
  if (
    context?.section_type === 'landing' ||
    context?.section_type === 'hero' ||
    hasHeroShape
  ) {
    return (
      <TimelineProvider
        key={`timeline-root`}
        timeline={{
          mode: `scroll`,
          debug: false,
          debugOverlay: true,
          interpolate: true,
          lerpFactor: 0.75,
          maxFPS: 35,
        }}
      >
        <Landing context={context} />
      </TimelineProvider>
    )
  }

  if ( context?.section_type === 'footer' ) {
    return <Footer />
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center', background: '#f5f5f5' }}>
      <h1>Framework Component Routing Stack</h1>
      <p>Missing or unrecognized section_type index wrapper data payload.</p>
    </div>
  );
}