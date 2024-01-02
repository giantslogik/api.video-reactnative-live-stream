import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { HostComponent, ViewProps } from 'react-native';
import type {
  DirectEventHandler,
  Float,
  Int32,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

// Type can't start with a digit so we prefix it with an underscore.
export type NativeResolution = '_240p' | '_360p' | '_480p' | '_720p' | '_1080p';
export type Camera = 'front' | 'back';

export type OnConnectionFailedEvent = Readonly<{
  code: string;
}>;

export interface NativeLiveStreamProps extends ViewProps {
  camera?: WithDefault<Camera, 'back'>;
  video: {
    bitrate: Int32;
    fps: Int32;
    resolution?: WithDefault<NativeResolution, '_720p'>;
    gopDuration: Float;
  };
  isMuted: boolean;
  audio: {
    bitrate: Int32;
    sampleRate?: WithDefault<5500 | 11025 | 22050 | 44100, 44100>;
    isStereo: boolean;
  };
  zoomRatio: Float;
  enablePinchedZoom: boolean;

  onConnectionSuccess?: DirectEventHandler<null>;
  onConnectionFailed?: DirectEventHandler<OnConnectionFailedEvent>;
  onDisconnect?: DirectEventHandler<null>;
}

export type NativeLiveStreamViewType = HostComponent<NativeLiveStreamProps>;

interface NativeCommands {
  startStreaming: (
    viewRef: React.ElementRef<NativeLiveStreamViewType>,
    streamKey: string,
    url?: string
  ) => void;
  stopStreaming: (viewRef: React.ElementRef<NativeLiveStreamViewType>) => void;
  setZoomRatioCommand: (
    viewRef: React.ElementRef<NativeLiveStreamViewType>,
    zoomRatio: Float
  ) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['startStreaming', 'stopStreaming', 'setZoomRatioCommand'],
});
export default codegenNativeComponent<NativeLiveStreamProps>(
  'ApiVideoLiveStreamView'
);