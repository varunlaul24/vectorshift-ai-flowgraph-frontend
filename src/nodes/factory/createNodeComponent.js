import { Position } from 'reactflow';
import { useStore } from '../../hooks/useStore';
import { BaseNode } from '../shared/BaseNode';
import { FIELD_TYPES } from '../nodeSchema';

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
  if (field.type === FIELD_TYPES.SELECT && field.options?.length) {
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

const buildSideHandles = (items, position, id) => {
  return items.map((item, index) => ({
    id: `${id}-${item.key}`,
    type: item.type || (position === Position.Left ? 'target' : 'source'),
    position,
    style: {
      ...buildHandleStyle(index, items.length),
      ...(item.style || {}),
    },
  }));
};

export const buildNodeHandles = ({ id, inputs = [], outputs = [], customHandles = null }) => {
  if (customHandles) {
    const leftItems = customHandles.filter(h => h.position === Position.Left || h.position === 'left');
    const rightItems = customHandles.filter(h => h.position === Position.Right || h.position === 'right');
    
    return [
      ...buildSideHandles(leftItems, Position.Left, id),
      ...buildSideHandles(rightItems, Position.Right, id),
    ];
  }

  return [
    ...buildSideHandles(inputs, Position.Left, id),
    ...buildSideHandles(outputs, Position.Right, id),
  ];
};

const FieldControl = ({ field, value, onChange }) => {
  if (field.type === FIELD_TYPES.SELECT) {
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

  if (field.type === FIELD_TYPES.TEXTAREA) {
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
      type={field.type || FIELD_TYPES.TEXT}
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