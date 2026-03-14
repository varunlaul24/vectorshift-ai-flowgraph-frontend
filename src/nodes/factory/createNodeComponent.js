import { useEffect } from 'react';
import { Position } from 'reactflow';
import { useStore } from '../../hooks/useStore';
import { BaseNode } from '../shared/BaseNode';
import { FIELD_TYPES } from '../nodeSchema';
import { useVariableSuggest } from '../../hooks/useVariableSuggest';

const selector = (state) => ({
  updateNodeField: state.updateNodeField,
  isNameUnique: state.isNameUnique,
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

const FieldControl = ({ field, value, onChange, nodeId, isInvalid }) => {
  const {
    textareaRef,
    handleTextChange,
    VariablePopup,
  } = useVariableSuggest(nodeId, field.key, value);

  useEffect(() => {
    const isTextarea = field.type === FIELD_TYPES.TEXTAREA || field.type === 'textarea';
    if (isTextarea && field.autoResize) {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, [value, field, textareaRef]);

  if (field.type === FIELD_TYPES.SELECT) {
    return (
      <select className={`node-field__control ${isInvalid ? 'node-field__control--invalid' : ''}`} value={value} onChange={onChange}>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === FIELD_TYPES.TEXTAREA || field.type === 'textarea') {
    const isAutoResize = !!field.autoResize;
    return (
      <div style={{ position: 'relative' }}>
        <textarea
          ref={textareaRef}
          className={`node-field__control node-field__control--textarea ${isInvalid ? 'node-field__control--invalid' : ''}`}
          value={value}
          onChange={(e) => {
            handleTextChange(e);
            onChange(e);
          }}
          rows={field.rows || 3}
          placeholder={field.placeholder || 'Type "{{" to utilize variables'}
          style={isAutoResize ? { overflow: 'hidden', resize: 'none' } : {}}
        />
        <VariablePopup />
      </div>
    );
  }

  return (
    <input
      className={`node-field__control ${isInvalid ? 'node-field__control--invalid' : ''}`}
      type={field.type || FIELD_TYPES.TEXT}
      value={value}
      onChange={onChange}
      placeholder={field.placeholder}
    />
  );
};

export const createNodeComponent = (config) => {
  const Component = function GeneratedNode({ id, data }) {
    const { updateNodeField, isNameUnique } = useStore(selector);
    const context = { id, data };
    const textareaFields = config.fields?.filter(f => f.type === FIELD_TYPES.TEXTAREA || f.type === 'textarea') || [];
    const textareaInputs = textareaFields.map(f => ({ key: f.key }));

    const handles = config.getHandles
      ? config.getHandles(context)
      : buildNodeHandles({ 
          id, 
          inputs: [...(config.inputs || []), ...textareaInputs], 
          outputs: config.outputs 
        });

    const content = config.renderContent ? (
      config.renderContent({
        id,
        data,
        updateNodeField,
        isNameUnique,
      })
    ) : (
      <>
        {config.fields?.map((field) => {
          const value = data?.[field.key] ?? getFieldDefaultValue(field, context);
          const isNameField = field.key.toLowerCase().includes('name');
          const isInvalid = isNameField && !isNameUnique(id, value);

          return (
            <label key={field.key} className="node-field">
              <span className="node-field__label">
                {field.label}
                {isInvalid && <span className="node-field__error"> (must be unique)</span>}
              </span>
              <FieldControl
                nodeId={id}
                field={field}
                value={value}
                isInvalid={isInvalid}
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
        style={{ overflow: 'visible' }}
      >
        {content}
      </BaseNode>
    );
  };

  const definition = config.type ? {
    type: config.type,
    label: config.label || config.title,
    category: config.category,
    icon: config.icon,
    description: config.description || config.subtitle,
    accent: config.accent,
    component: Component,
    getInitialData: (id) => ({
      id,
      nodeType: config.type,
      ...getInitialDataFromFields(config.fields || [], { id, data: {} }),
    }),
  } : undefined;

  return Object.assign(Component, { definition });
};