import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './style/row.less';

export default class Row extends React.Component {
  static defaultProps = {
    prefixCls: 'w-row',
    gutter: 0,
    justify: null,
  }
  render() {
    const { prefixCls, className, gutter, justify, align, ...props } = this.props;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}-align-${align}`]: align,
      [`${prefixCls}-justify-${justify}`]: justify,
    });
    const gutterStyl = !gutter ? {} : { paddingLeft: gutter / 2, paddingRight: gutter / 2 };
    return (
      <div {...props} className={cls}>
        {React.Children.map(this.props.children, (element) => {
          return React.cloneElement(element, Object.assign({}, element.props, {
            style: { ...element.props.style, ...gutterStyl },
          }));
        })}
      </div>
    );
  }
}

Row.propTypes = {
  prefixCls: PropTypes.string,
  gutter: PropTypes.number,
  justify: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),
  align: PropTypes.oneOf(['top', 'middle', 'bottom', 'baseline']),
};
