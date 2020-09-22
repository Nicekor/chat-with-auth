import React, { useState, useCallback, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import useWindowSize from '../../../hooks/useWindowSize';

const useStyles = makeStyles((theme) => {
  return {
    scrollhostContainer: {
      position: 'relative',
      height: '100%',
    },
    scrollhost: {
      overflow: 'auto',
      height: '100%',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      position: 'relative',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    scrollbar: {
      width: 10,
      height: '100%',
      position: 'absolute',
      right: 0,
      bottom: 0,
      top: 0,
      borderRadius: theme.spacing(1),
      backgroundColor: theme.palette.scrollbar,
    },
    scrollThumb: {
      width: 8,
      height: 20,
      marginLeft: 1,
      position: 'absolute',
      borderRadius: theme.spacing(1),
      opacity: 1,
      top: 0,
      backgroundColor: theme.palette.scrollThumb,
    },
  };
});

const SCROLL_BOX_MIN_HEIGHT = 20;

const Scrollbar = ({ children, scrollToBottom, ...props }) => {
  const classes = useStyles();
  const [hovering, setHovering] = useState(false);
  const [scrollBoxHeight, setScrollBoxHeight] = useState(SCROLL_BOX_MIN_HEIGHT);
  const [scrollBoxTop, setScrollBoxTop] = useState(0);
  const [lastScrollThumbPosition, setScrollThumbPosition] = useState(0);
  const [isDragging, setDragging] = useState(false);
  const scrollHostRef = useRef();
  const messagesEndRef = useRef();
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (scrollToBottom) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollToBottom]);

  const handleMouseOver = useCallback(() => {
    setHovering(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setHovering(false);
  }, []);

  const handleDocumentMouseUp = useCallback(
    (e) => {
      if (isDragging) {
        e.preventDefault();
        setDragging(false);
      }
    },
    [isDragging]
  );

  const handleDocumentMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        const scrollHostElement = scrollHostRef.current;
        const { scrollHeight, offsetHeight } = scrollHostElement;

        let deltaY = e.clientY - lastScrollThumbPosition;
        let percentage = deltaY * (scrollHeight / offsetHeight);

        setScrollThumbPosition(e.clientY);
        setScrollBoxTop(
          Math.min(
            Math.max(0, scrollBoxTop + deltaY),
            offsetHeight - scrollBoxHeight
          )
        );
        scrollHostElement.scrollTop = Math.min(
          scrollHostElement.scrollTop + percentage,
          scrollHeight - offsetHeight
        );
      }
    },
    [isDragging, lastScrollThumbPosition, scrollBoxHeight, scrollBoxTop]
  );

  const handleScrollThumbMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollThumbPosition(e.clientY);
    setDragging(true);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollHostRef) {
      return;
    }
    const scrollHostElement = scrollHostRef.current;
    const { scrollTop, scrollHeight, offsetHeight } = scrollHostElement;

    let newTop =
      (parseInt(scrollTop, 10) / parseInt(scrollHeight, 10)) * offsetHeight;
    newTop = Math.min(newTop, offsetHeight - scrollBoxHeight);
    setScrollBoxTop(newTop);
  }, [scrollBoxHeight]);

  useEffect(() => {
    const scrollHostElement = scrollHostRef.current;
    const { clientHeight, scrollHeight } = scrollHostElement;
    const scrollThumbPercentage = clientHeight / scrollHeight;
    const scrollThumbHeight = Math.max(
      scrollThumbPercentage * clientHeight,
      SCROLL_BOX_MIN_HEIGHT
    );
    setScrollBoxHeight(scrollThumbHeight);
    scrollHostElement.addEventListener('scroll', handleScroll, true);
    return () => {
      scrollHostElement.removeEventListener('scroll', handleScroll, true);
    };
  }, [handleScroll, width, height]);

  /**
   * Why document?
   * Because while dragging you can move your mouse anywhere in the document, this is the default behaviour in all scroll-bar.
   */
  useEffect(() => {
    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
    document.addEventListener('mouseleave', handleDocumentMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      document.removeEventListener('mouseleave', handleDocumentMouseUp);
    };
  }, [handleDocumentMouseMove, handleDocumentMouseUp]);

  return (
    <div
      className={classes.scrollhostContainer}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div ref={scrollHostRef} className={classes.scrollhost} {...props}>
        {children}
        {scrollToBottom && <div ref={messagesEndRef}></div>}
      </div>
      <div className={classes.scrollbar} style={{ opacity: hovering ? 1 : 0 }}>
        <div
          className={classes.scrollThumb}
          style={{ height: scrollBoxHeight, top: scrollBoxTop }}
          onMouseDown={handleScrollThumbMouseDown}
        />
      </div>
    </div>
  );
};

export default Scrollbar;
