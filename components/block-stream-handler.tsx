import { type Dispatch, memo, type SetStateAction } from 'react';

import { useBlockStream } from './use-block-stream';

import type { UIBlock } from './block';
import type { JSONValue } from 'ai';

interface BlockStreamHandlerProps {
  setBlock: Dispatch<SetStateAction<UIBlock>>;
  streamingData: JSONValue[] | undefined;
}

export function PureBlockStreamHandler({
  setBlock,
  streamingData,
}: BlockStreamHandlerProps) {
  useBlockStream({
    streamingData,
    setBlock,
  });

  return null;
}

function areEqual(
  prevProps: BlockStreamHandlerProps,
  nextProps: BlockStreamHandlerProps,
) {
  if (!prevProps.streamingData && !nextProps.streamingData) {
    return true;
  }

  if (!prevProps.streamingData || !nextProps.streamingData) {
    return false;
  }

  if (prevProps.streamingData.length !== nextProps.streamingData.length) {
    return false;
  }

  return true;
}

export const BlockStreamHandler = memo(PureBlockStreamHandler, areEqual);
