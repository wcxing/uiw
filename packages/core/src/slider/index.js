import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style/index.less';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  componentDidMount() {
    const { value } = this.props;
    this.setState({ value });
  }
  componentWillReceiveProps(nextPros) {
    if (nextPros.value !== this.props.value) {
      this.setState({
        value: nextPros.value,
      });
    }
  }
  removeEvent() {
    window.removeEventListener('mousemove', this.onDragging, false);
    window.removeEventListener('mouseup', this.onDragEnd, false);
  }
  onHandleBtnDown(ev) {
    const oEvent = ev || event;
    const { disabled, vertical } = this.props;
    if (disabled) {
      return;
    }
    this.move = true;
    this.startX = oEvent[vertical ? 'clientY' : 'clientX'];
    this.target = oEvent.target;
    this.boxWidth = this.slider[vertical ? 'clientHeight' : 'clientWidth'];
    this.barWidth = this.bar[vertical ? 'clientHeight' : 'clientWidth'];
    window.addEventListener('mousemove', this.onDragging, true);
    window.addEventListener('mouseup', this.onDragEnd, true);
  }
  onDragging = (env) => {
    if (!this.move) {
      return;
    }
    const { vertical } = this.props;
    const value = this.getWidthToValue(env[vertical ? 'clientY' : 'clientX'] - this.startX + this.barWidth);
    if (value !== this.value) {
      this.target.style[vertical ? 'top' : 'left'] = `${this.getValueToPercent(value)}%`;
      this.bar.style[vertical ? 'bottom' : 'right'] = `${100 - this.getValueToPercent(value)}%`;
      this.onChange(value);
      this.value = value;
    }
  }
  onDragEnd = () => {
    this.move = undefined;
    this.removeEvent();
  }
  getWidthToValue(width) {
    const { step, max, min, vertical } = this.props;

    const equal = (max - min) / step;
    let percent = width / this.slider[vertical ? 'clientHeight' : 'clientWidth'] * 100;

    if (percent <= 0) {
      percent = 0;
    }
    if (percent >= 100) {
      percent = 100;
    }

    const num = equal * (percent / 100) + 0.5;
    const numFloor = Math.floor(num);
    const value = numFloor * step + min;
    return value;
  }
  getValueToPercent(value) {
    const { min, max } = this.props;
    return ((value - min) * 100) / (max - min);
  }
  getLabelValue(value) {
    const { marks, renderMarks } = this.props;
    if (marks && marks[value] && marks[value].label) {
      return marks[value].label;
    } else if (marks && marks[value] && typeof marks[value] === 'string') {
      return marks[value];
    } else if (renderMarks && typeof renderMarks === 'function' && renderMarks(value)) {
      return renderMarks(value);
    }
    return value;
  }
  onChange(value) {
    const { onChange } = this.props;
    onChange && onChange(value);
    this.setState({ value });
  }
  onClickMark(env) {
    const { vertical } = this.props;
    const oEvent = env || event;
    if (this.move !== undefined) {
      return;
    }
    const markOffset = this.slider.getBoundingClientRect();
    const value = this.getWidthToValue(oEvent[vertical ? 'clientY' : 'clientX'] - markOffset[vertical ? 'y' : 'x']);
    this.onChange(value);
  }
  stepArray() {
    const { min, max, step } = this.props;
    const equal = (max - min) / step;
    const stepWidth = (100 * step) / (max - min);
    const result = [0];
    for (let i = 1; i < equal; i += 1) {
      result.push(i * stepWidth);
    }
    result.push(100);
    return result;
  }
  getInstance = (node) => {
    if (node) {
      this.bar = node;
    }
  }
  render() {
    const { prefixCls, className, value, disabled, max, min, dots, step, marks, renderMarks, tooltip, vertical, progress, onChange, ...other } = this.props;
    const leftPostion = this.getValueToPercent(this.state.value);
    other.onClick = this.onClickMark.bind(this);
    if (disabled) {
      delete other.onClick;
    }
    return (
      <div
        ref={node => this.slider = node}
        className={classnames(prefixCls, className, {
          disabled,
          [`${prefixCls}-with-marks`]: marks,
          [`${prefixCls}-vertical`]: vertical,
        })}
        {...other}
      >
        <div
          className={classnames(`${prefixCls}-bar`)}
          style={{
            [vertical ? 'top' : 'left']: '0%',
            [vertical ? 'bottom' : 'right']: `${100 - leftPostion}%`,
            backgroundColor: progress || 'initial',
          }}
          ref={this.getInstance}
        />
        <div
          className={classnames(`${prefixCls}-handle`)}
          onMouseDown={this.onHandleBtnDown.bind(this)}
          style={{ [vertical ? 'top' : 'left']: `${leftPostion}%` }}
        >
          {(tooltip || tooltip === false) && <div className={classnames(`${prefixCls}-tooltip`, { open: tooltip })}>{this.getLabelValue(this.state.value)}</div>}
        </div>
        {dots && (
          <div className={classnames(`${prefixCls}-dots`)}>
            {this.stepArray().map((val, idx) => {
              const stepValue = idx * step + min;
              return (
                <div
                  key={idx}
                  style={{
                    [vertical ? 'top' : 'left']: `${val}%`,
                  }}
                  className={classnames(`${prefixCls}-mark`, {
                    'no-marks': marks && marks !== true && !marks[stepValue],
                  })}
                >
                  {marks === true && <div {...(disabled ? {} : { onClick: this.onChange.bind(this, stepValue) })}> {this.getLabelValue(stepValue)} </div>}
                  {marks !== true && marks && marks[stepValue] && (
                    <div style={marks[stepValue].style} {...(disabled ? {} : { onClick: this.onChange.bind(this, stepValue) })}>
                      {this.getLabelValue(stepValue)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

Slider.propTypes = {
  prefixCls: PropTypes.string,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  marks: PropTypes.oneOfType([
    PropTypes.object, PropTypes.bool,
  ]),
  renderMarks: PropTypes.func,
  dots: PropTypes.bool,
  vertical: PropTypes.bool,
  step: PropTypes.number,
  disabled: PropTypes.bool,
  progress: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  tooltip: PropTypes.bool,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  prefixCls: 'w-slider',
  value: 0,
  min: 0,
  max: 100,
  dots: false,
  step: 1,
  disabled: false,
  progress: true,
  tooltip: false,
};
