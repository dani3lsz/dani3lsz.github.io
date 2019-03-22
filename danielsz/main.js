(function () {
  const Clip = {
    id: 'js-clip', // id of node
    side: 'left', // top, right, bottom, left
    depth: 40,
    unit: '%', // % or px
    points: 5,
    timeOut: 5000, //ms
    timing: 'ease-in-out',
    distribute: 'between', // random, even, between

    start(opts = {}) {
      const id = opts.id || this.id;
      const node = document.getElementById(id);
      const timeOut = opts.timeOut || this.timeOut;
      const timing = opts.timing || this.timing;

      if ((opts.points || this.points) < 2) return console.warn('points must be above 2');
      if (!node) return console.warn('No node found with #' + id);

      node.style.setProperty('transition',timeOut + 'ms ' + timing);

      this.clip(node,opts); // initial clip
      setTimeout(() => this.clip(node,opts),10); // start animating soon
      setInterval(() => this.clip(node,opts),timeOut) // animate with every interval
    },

    clip(node,opts = {}) {
      if (!node) return;

      const getRandom = this.getRandom;
      const side = opts.side || this.side;
      const depth = opts.depth || this.depth;
      const unit = opts.unit || this.unit;
      const points = opts.points || this.points;
      const distribute = opts.distribute || this.distribute;
      const arr = [];
      const nodeW = node.offsetWidth;
      const nodeH = node.offsetHeight;
      const w = unit === '%' ? 100 : nodeW;
      const h = unit === '%' ? 100 : nodeH;

      let xMin, xMax, yMin, yMax;

      if (side === 'left' || side === 'right') {
        xMin = side === 'left' ? 0 : w - depth;
        xMax = side === 'left' ? depth : w;
        yMin = 0;
        yMax = h;
      } else {
        yMin = side === 'top' ? 0 : h - depth;
        yMax = side === 'top' ? depth : h;
        xMin = 0;
        xMax = w;
      }

      for (let i = 0; i < points; i++) {
        let x, y, d;

        if (side === 'left' || side === 'right') {
          d = h / points;
          x = getRandom(xMin,xMax);
          y = i === 0 ? yMin : (i === points - 1 ? yMax : (distribute === 'random' ? getRandom(yMin,yMax) : (distribute === 'even' ? (d * i) : (d * i + getRandom(-d/2,d/2)))));
        } else {
          d = w / points;
          y = getRandom(yMin,yMax);
          x = i === 0 ? xMin : (i === points - 1 ? xMax : (distribute === 'random' ? getRandom(xMin,xMax) : (distribute === 'even' ? (d * i) : (d * i + getRandom(-d/2,d/2)))));
        }

        arr.push([x,y])
      }

      arr.sort((a,b) => {
        const idx = side === 'left' || side === 'right' ? 1 : 0;

        return a[idx] - b[idx]
      });

      if (side === 'left') {
        arr.push([w,h],[w,0])
      } else if (side === 'right') {
        arr.push([0,h],[0,0])
      } else if (side === 'top') {
        arr.push([w,h],[0,h])
      } else {
        arr.push([w,0],[0,0])
      }

      const string = arr.map(point => {
        return point[0] + unit + ' ' + point[1] + unit
      }).join(',');

      node.style.setProperty('-webkit-clip-path','polygon(' + string + ')');
      node.style.setProperty('clip-path','polygon(' + string + ')');
    },

    getRandom(min,max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  Clip.start({id: 'js-clip1'});
  Clip.start({id: 'js-clip2', timeOut: 4500});
})();