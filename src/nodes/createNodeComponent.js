import { Position } from 'reactflow';
import { useStore } from '../store';
import { BaseNode } from './BaseNode';

const selector = (state) => ({
  updateNodeField: state.updateNodeField,
});

const getResolvedValue = (value, context) => {
  return typeof value === 'function' ? value(context) : value;
};

export const getFieldDefaultValue = (field, context) => {
  if (field.defaultValue !== undefined) {
    return getResolvedValue(field.defaultValue, context);
  }

  if (field.type === 'select' && field.options?.length) {
    return field.options[0].value;
  }

  return '';
};

export const getInitialDataFromFields = (fields, context) => {
  return fields.reduce((accumulator, field) => {
    accumulator[field.key] = getFieldDefaultValue(field, context);
    return accumulator;
  }, {});
};

const buildHandleStyle = (index, total) => {
  if (total <= 1) {
    return undefined;
  }

  return {
    top: `${((index + 1) / (total + 1)) * 100}%`,
  };
};

const buildSideHandles = (items, position, id, type) => {
  return items.map((item, index) => ({
    id: `${id}-${item.key}`,
    type,
    position,
    style: {
      ...buildHandleStyle(index, items.length),
      ...(item.style || {}),
    },
  }));
};

export const buildNodeHandles = ({ id, inputs = [], outputs = [] }) => {
  return [
    ...buildSideHandles(inputs, Position.Left, id, 'target'),
    ...buildSideHandles(outputs, Position.Right, id, 'source'),
  ];
};

const FieldControl = ({ field, value, onChange }) => {
  if (field.type === 'select') {
    return (
      <select className="node-field__control" value={value} onChange={onChange}>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        className="node-field__control node-field__control--textarea"
        value={value}
        onChange={onChange}
        rows={field.rows || 3}
        placeholder={field.placeholder}
      />
    );
  }

  return (
    <input
      className="node-field__control"
      type={field.type || 'text'}
      value={value}
      onChange={onChange}
      placeholder={field.placeholder}
    />
  );
};

export const createNodeComponent = (config) => {
  return function GeneratedNode({ id, data }) {
    const { updateNodeField } = useStore(selector);
    const context = { id, data };
    const handles = config.getHandles
      ? config.getHandles(context)
      : buildNodeHandles({ id, inputs: config.inputs, outputs: config.outputs });

    const content = config.renderContent ? (
      config.renderContent({
        id,
        data,
        updateNodeField,
      })
    ) : (
      <>
        {config.fields?.map((field) => {
          const value = data?.[field.key] ?? getFieldDefaultValue(field, context);

          return (
            <label key={field.key} className="node-field">
              <span className="node-field__label">{field.label}</span>
              <FieldControl
                field={field}
                value={value}
                onChange={(event) => updateNodeField(id, field.key, event.target.value)}
              />
            </label>
          );
        })}
      </>
    );

    return (
      <BaseNode
        title={config.title}
        subtitle={config.subtitle}
        accent={config.accent}
        handles={handles}
      >
        {content}
      </BaseNode>
    );
  };
};