import { View } from 'react-native';
import Button from './Button';
import Row from './Row';
import { Delete, MoreOrLess } from '../icons';
import React, { useEffect, useImperativeHandle, useState } from 'react';

export interface KeyboardRef {
  clearExpression: () => void;
}

export interface KeyboardProps {
  onChangeExpression?: (expression: string) => void;
  onChangeResult?: (result: number | null) => void;
  onPressEqual?: () => void;
  onClear?: () => void;
}

export type HandlePressData = {
  type: 'clear' | 'equal' | 'delete' | 'number' | 'operator';
  value?: number | string;
  title?: string;
} | {
  type: 'clear' | 'equal' | 'delete';
} | {
  type: 'number';
  value: number;
  title: undefined;
} | {
  type: 'operator';
  value: string;
  title?: string;
};

const KeyboardComponent = React.forwardRef<KeyboardRef, KeyboardProps>(({
  onChangeExpression,
  onChangeResult,
  onPressEqual,
  onClear,
}, ref) => {
  const [expression, setExpression] = useState('');
  const [displayExpression, setDisplayExpression] = useState('');
  const [result, setResult] = useState(null);

  useImperativeHandle(ref, () => ({
    clearExpression: () => {
      setExpression('')
      setDisplayExpression('')
    },
  }));

  function handlePress(data: HandlePressData) {
    if (data.type === 'number' || data.type === 'operator') {
      setExpression(
        expression.concat(data?.value?.toString() as string)
      );

      setDisplayExpression(
        displayExpression.concat(
          (data?.title?.toString() || data?.value?.toString()) as string
        )
      );
    } else if (data.type === 'clear') {
      if (onClear) onClear();

      setExpression('');
      setDisplayExpression('');
    } else if (data.type === 'delete') {
      setExpression(expression.slice(0, -1));
      setDisplayExpression(displayExpression.slice(0, -1));
    } else if (data.type === 'equal') {
      if (onPressEqual) onPressEqual();
    }
  }

  useEffect(() => {
    if (onChangeExpression) onChangeExpression(displayExpression);
  }, [displayExpression]);

  useEffect(() => {
    try {
      setResult(eval(expression));
    } catch {}
  }, [expression]);

  useEffect(() => {
    if (onChangeResult) onChangeResult(result);
  }, [result]);

  return (
    <View
      style={{
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Row>
        <Button
          title="C"
          variant="secondary"
          onPress={() => handlePress({
            type: 'clear',
          })}
        />

        <Button
          variant="secondary"
          onPress={() => handlePress({
            type: 'operator',
            value: '+',
          })}
        >
          <MoreOrLess />
        </Button>

        <Button
          title="%"
          variant="secondary"
          onPress={() => handlePress({
            type: 'operator',
            value: '%',
          })}
        />

        <Button
          title="÷"
          variant="primary"
          onPress={() => handlePress({
            type: 'operator',
            value: '/',
            title: '÷',
          })}
        />
      </Row>

      <Row>
        <Button
          title="7"
          variant="tertiary"
          onPress={() => handlePress({
            type: 'number',
            value: 7,
          })}
        />

        <Button
          title="8"
          variant="tertiary"
          onPress={() => handlePress({
            type: 'number',
            value: 8,
          })}
        />

        <Button
          title="9"
          variant="tertiary"
          onPress={() => handlePress({
            type: 'number',
            value: 9,
          })}
        />

        <Button
          title="×"
          variant="primary"
          onPress={() => handlePress({
            type: 'operator',
            value: '*',
            title: '×',
          })}
        />
      </Row>

      <Row>
        <Button
          title="4"
          variant="tertiary"
          onPress={() => handlePress({
            type: 'number',
            value: 4,
          })}
        />

        <Button
          title="5"
          variant="tertiary"
          onPress={() => handlePress({
            type: 'number',
            value: 5,
          })}
        />

        <Button
          title="6"
          variant="tertiary"
          onPress={() => handlePress({
            type: 'number',
            value: 6,
          })}
        />

        <Button
          title="–"
          variant="primary"
          onPress={() => handlePress({
            type: 'operator',
            value: '-',
            title: '–',
          })}
        />
      </Row>

      <Row>
        <Button
          title="1"
          variant="tertiary"
          onPress={() => handlePress({
            type: 'number',
            value: 1,
          })}
        />

        <Button
          title="2"
          variant="tertiary"
          onPress={() => handlePress({
            type: 'number',
            value: 2,
          })}
        />

        <Button
          title="3"
          variant="tertiary"
          onPress={() => handlePress({
            type: 'number',
            value: 3,
          })}
        />

        <Button
          title="+"
          variant="primary"
          onPress={() => handlePress({
            type: 'operator',
            value: '+',
          })}
        />
      </Row>

      <Row>
        <Button
          title=","
          variant="tertiary"
          onPress={() => handlePress({
            type: 'operator',
            value: ','
          })}
        />

        <Button
          title="0"
          variant="tertiary"
          onPress={() => handlePress({
            type: 'number',
            value: 0,
          })}
        />

        <Button
          variant="tertiary"
          onPress={() => handlePress({
            type: 'delete',
          })}
        >
          <Delete />
        </Button>

        <Button
          title="="
          variant="primary"
          onPress={() => handlePress({
            type: 'equal',
          })}
        />
      </Row>
    </View>
  );
})

export default KeyboardComponent;
