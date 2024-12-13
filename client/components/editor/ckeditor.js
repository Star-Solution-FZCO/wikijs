import { ButtonView } from 'ckeditor5/src/ui'
import { DecoupledEditor as DecoupledEditorBase } from '@ckeditor/ckeditor5-editor-decoupled'
import { AccessibilityHelp } from '@ckeditor/ckeditor5-ui'
import { Alignment } from '@ckeditor/ckeditor5-alignment'
import { Autoformat } from '@ckeditor/ckeditor5-autoformat'
import {
  AutoImage,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload
} from '@ckeditor/ckeditor5-image'
import { AutoLink, Link } from '@ckeditor/ckeditor5-link'
import { Autosave } from '@ckeditor/ckeditor5-autosave'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote'
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles'
import { Clipboard } from '@ckeditor/ckeditor5-clipboard'
import { CodeBlock } from '@ckeditor/ckeditor5-code-block'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace'
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font'
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support'
import { Heading } from '@ckeditor/ckeditor5-heading'
import { Highlight } from '@ckeditor/ckeditor5-highlight'
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line'
import { Indent } from '@ckeditor/ckeditor5-indent'
import { List, TodoList } from '@ckeditor/ckeditor5-list'
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office'
import { Plugin } from '@ckeditor/ckeditor5-core'
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format'
import { SelectAll } from '@ckeditor/ckeditor5-select-all'
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload'
import { SpecialCharacters } from '@ckeditor/ckeditor5-special-characters'
import { Table, TableColumnResize, TableToolbar, TableProperties, TableCellProperties } from '@ckeditor/ckeditor5-table'
import { TextTransformation } from '@ckeditor/ckeditor5-typing'
import { Undo } from '@ckeditor/ckeditor5-undo'
import { WordCount } from '@ckeditor/ckeditor5-word-count'
import UploadAdapterPlugin from './upload-adapter'

import 'ckeditor5/dist/ckeditor5.css'

import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg'
import linkToPageIcon from './icons/link-to-page.svg'

export default class DecoupledEditor extends DecoupledEditorBase { }

class LinkToPage extends Plugin {
  init() {
    const editor = this.editor
    editor.ui.componentFactory.add('linkToPage', (locale) => {
      const view = new ButtonView(locale)

      view.set({
        label: 'Insert Link to Page',
        icon: linkToPageIcon,
        tooltip: true
      })

      view.on('execute', () => {
        WIKI.$emit('editorLinkToPage')
      })

      return view
    })
  }
}

class InsertAsset extends Plugin {
  init() {
    const editor = this.editor

    editor.ui.componentFactory.add('insertAsset', (locale) => {
      const view = new ButtonView(locale)

      view.set({
        label: 'Insert Assets',
        icon: imageIcon,
        tooltip: true
      })

      view.on('execute', () => {
        WIKI.$store.set('editor/activeModal', 'editorModalMedia')
      })

      return view
    })
  }
}

const plugins = [
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  Clipboard,
  Code,
  CodeBlock,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  SimpleUploadAdapter,
  SpecialCharacters,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableToolbar,
  TableColumnResize,
  TableProperties,
  TableCellProperties,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
  WordCount,
  InsertAsset,
  LinkToPage
]

const toolbar = {
  items: [
    'undo',
    'redo',
    'removeFormat',
    '|',
    'findAndReplace',
    '|',
    'heading',
    '|',
    'fontSize',
    'fontFamily',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'subscript',
    'superscript',
    'highlight',
    '|',
    'alignment',
    '|',
    'bulletedList',
    'numberedList',
    'todoList',
    'outdent',
    'indent',
    '|',
    'specialCharacters',
    'linkToPage',
    'link',
    'blockQuote',
    'mediaEmbed',
    'insertAsset',
    'insertTable',
    'code',
    'codeBlock',
    '|',
    'horizontalLine'
  ]
  // shouldNotGroupWhenFull: true
}

const editorConfig = {
  toolbar,
  plugins,
  extraPlugins: [UploadAdapterPlugin],
  fontFamily: {
    supportAllValues: true
  },
  fontSize: {
    options: [10, 12, 14, 'default', 18, 20, 22],
    supportAllValues: true
  },
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
    ]
  },
  image: {
    toolbar: [
      'toggleImageCaption',
      'imageTextAlternative',
      '|',
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
      '|',
      'resizeImage'
    ]
  },
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://'
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
  }
}

DecoupledEditor.defaultConfig = editorConfig
