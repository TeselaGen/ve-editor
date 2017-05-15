import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import createVectorEditor, {
  reducer,
  CircularView,
  RowView,
  RowItem,
  VeToolBar,
  CutsiteFilter
} from '../src';
import exampleSequenceData from '../es/exampleData/exampleSequenceData';


storiesOf('CircularView', module)
  .add('CircularView', () => (
      <CircularView sequenceData={exampleSequenceData}/>
    
  ))
  .add('RowView', () => (
	<RowView/>
  ))
  .add('RowItem', () => (
	<RowItem/>
  ))
  .add('VeToolBar', () => (
	<VeToolBar/>
  ))
  .add('CutsiteFilter', () => (
  <CutsiteFilter/>
  ))

  

 storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));
