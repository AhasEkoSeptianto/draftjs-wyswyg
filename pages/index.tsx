import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { FC, useEffect, useRef, useState, Fragment } from 'react'
import styles from '../styles/Home.module.css'
import 'draft-js/dist/Draft.css';


const Home: NextPage = () => {
  return (
    <div className=''>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <App />
    </div>
  )
}

export default Home

const NoSsr = (props:any) => {
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{
    setMounted(true);
  }, [])
  return <>
    { mounted ? props.children : null }
  </>
}


const initialState = {
  entityMap: {
    0: {
      type: 'IMAGE',
      mutability: 'IMMUTABLE',
      data: {
        src: 'https://www.draft-js-plugins.com/images/canada-landscape-small.jpg',
      },
    },
  },
  blocks: [
    {
      key: '9gm3s',
      text:
        'You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'ov7r',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: 'e23a8',
      text: 'See advanced examples further down …',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};
/* eslint-enable */


import createImagePlugin from '@draft-js-plugins/image';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createFocusPlugin from '@draft-js-plugins/focus';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createDragNDropUploadPlugin from '@draft-js-plugins/drag-n-drop-upload';
import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from '@draft-js-plugins/buttons';
import createSideToolbarPlugin from '@draft-js-plugins/side-toolbar';
import createUndoPlugin from '@draft-js-plugins/undo';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createVideoPlugin from '@draft-js-plugins/video';

import '@draft-js-plugins/image/lib/plugin.css';
import '@draft-js-plugins/alignment/lib/plugin.css';
import '@draft-js-plugins/focus/lib/plugin.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css'
import '@draft-js-plugins/undo/lib/plugin.css';
import '@draft-js-plugins/linkify/lib/plugin.css';
import '@draft-js-plugins/anchor/lib/plugin.css'
import '@draft-js-plugins/inline-toolbar/lib/plugin.css'
import '@draft-js-plugins/hashtag/lib/plugin.css';

import buttonStyles from './buttonStyles.module.css';
import toolbarStyles from './toolbarStyles.module.css';
import blockTypeSelectStyles from './blockTypeSelectStyles.module.css';
import createHashtagPlugin from '@draft-js-plugins/hashtag';

import Editor, { composeDecorators } from '@draft-js-plugins/editor';
import { convertFromRaw, EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import editorStyles from './../styles/editor.module.css';

import mockUpload from './mockUpload.js';

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const staticToolbarPlugin = createToolbarPlugin();
const sideToolbarPlugin = createSideToolbarPlugin({
  position: 'left',
  theme: { buttonStyles, toolbarStyles, blockTypeSelectStyles },
});
const undoPlugin = createUndoPlugin();
const linkifyPlugin = createLinkifyPlugin({ target: '_blank' });
const linkPlugin = createLinkPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const hashtagPlugin = createHashtagPlugin();
const videoPlugin = createVideoPlugin();

const { UndoButton, RedoButton } = undoPlugin;
const { AlignmentTool } = alignmentPlugin;
const { Toolbar } = staticToolbarPlugin;
const { SideToolbar } = sideToolbarPlugin
const { InlineToolbar } = inlineToolbarPlugin;
const { types } = videoPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});

const plugins = [
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  imagePlugin,
  staticToolbarPlugin,
  sideToolbarPlugin,
  undoPlugin,
  linkifyPlugin,
  inlineToolbarPlugin, 
  linkPlugin,
  hashtagPlugin,
  videoPlugin
];

const App = () => {
  const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromRaw(initialState)));

  const editorRef = useRef(null)

  const text =
  'Click on the + button below and insert "/images/canada-landscape-small.jpg" to add the landscape image. Alternativly you can use any image url on the web.';

  const onChange = (editorState:any) => {
    setEditorState(editorState)
  };

  const GETData = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
 
    const markup = draftToHtml( rawContentState);

    console.log(markup)
  }

  return (
    <NoSsr>
      <div className={`m-20 border-4`} >
        <Toolbar >
            {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => (
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Fragment>
                      <BoldButton {...externalProps} />
                      <ItalicButton {...externalProps} />
                      <UnderlineButton {...externalProps} />
                      <CodeButton {...externalProps} />
                      <Separator {...externalProps} />
                      <HeadlinesButton {...externalProps} />
                      <UnorderedListButton {...externalProps} />
                      <OrderedListButton {...externalProps} />
                      <BlockquoteButton {...externalProps} />
                    </Fragment>
                  </div>
                  <div className='flex items-center '>
                      <UndoButton />
                      <RedoButton />
                  </div>
                </div>
              )
            }
        </Toolbar>
        <div className='p-5'>
          <Editor 
            editorState={editorState} 
            onChange={setEditorState}
            plugins={plugins}
            ref={editorRef}
          />
        </div>
         <AlignmentTool />
      </div>
      <ImageAdd
          editorState={editorState}
          onChange={onChange}
          modifier={imagePlugin.addImage}
        />
      <VideoAdd 
          editorState={editorState}
          onChange={onChange}
          modifier={imagePlugin.addImage}
      />
        <SideToolbar >
          {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => (
                <div className='grid grid-cols-2'>
                  <HeadlineOneButton {...externalProps} />
                  <HeadlineTwoButton {...externalProps} />
                  <HeadlineThreeButton {...externalProps} />
                  <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    
                </div>
              )
            }
        </SideToolbar>

        <InlineToolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <linkPlugin.LinkButton {...externalProps} />
              </div>
            )
          }
        </InlineToolbar>
      <button onClick={GETData}>Get DAta</button>
    </NoSsr>
  )
}

// insert image
const ImageAdd = ({ editorState, onChange, modifier }:any) => {
  
  const [ uri, setUri ] = useState('')

  const handleClick = async () => {
    const imagePlugin = createImagePlugin();//initialize image plugin
    // const base64 =
    //   "data:image/png;base64,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";
    const newEditorState = imagePlugin.addImage(editorState, uri, {});
    onChange(newEditorState)
  };

  
  return (
    <div>
      <input type='text' value={uri} onChange={e => setUri(e.target.value)} />
      <button onClick={handleClick}>Submit</button>
    </div>
  )
}


// insert image
const VideoAdd = ({ editorState, onChange, modifier }:any) => {
  
  const [ uri, setUri ] = useState('')

  const handleClick = async () => {
    const videoPlugin = createVideoPlugin()
    const newEditorState = videoPlugin.addVideo(editorState, { src: uri })
    // const base64 =
    //   "data:image/png;base64,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";
    // const newEditorState = imagePlugin.addImage(editorState, uri, {});
    onChange(newEditorState)
  };

  
  return (
    <div>
      <p>Video</p>
      <input type='text' value={uri} onChange={e => setUri(e.target.value)} />
      <button onClick={handleClick}>Submit</button>
    </div>
  )
}


class HeadlinesPicker extends React.Component<any, any> {
  componentDidMount() {
    setTimeout(() => {
      window.addEventListener('click', this.onWindowClick);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => (
          // eslint-disable-next-line
          <Button key={i} {...this.props} />
        ))}
      </div>
    );
  }
}

class HeadlinesButton extends React.Component<any, any> {
  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div className={editorStyles.headlineButtonWrapper}>
        <button onClick={this.onClick} className={editorStyles.headlineButton}>
          H
        </button>
      </div>
    );
  }
}