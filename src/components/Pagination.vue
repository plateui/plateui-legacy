<template>
<div class="pagination" v-if="pages > 1">
  <ul class="pagination_list">
    <li :class="{'_disabled': !prevPage}">
      <a class="prev" @click="select(prevPage)">
        <svg-icon name="arrow-left" aria-label="Previous Page" />
      </a>
    </li>
    <li class="num" :class="{'_active': page==1}"><a @click="select(1)">1</a></li>
    <li v-if="leftEdge">
      <a class="edge" @click="selectLeft"><svg-icon name="more-horizontal"/></a>
    </li>
    <li class="num" v-for="p in numbers" :class="{'_active': p==page}" :key="p">
      <a @click="select(p)" v-text="p"></a>
    </li>
    <li v-if="rightEdge">
      <a class="edge" @click="selectRight"><svg-icon name="more-horizontal"/></a>
    </li>
    <li class="num" :class="{'_active': page==pages}"><a @click="select(pages)" v-text="pages"></a></li>
    <li :class="{'_disabled': !nextPage}">
      <a class="next" @click="select(nextPage)">
        <svg-icon name="arrow-right" aria-label="Next Page" />
      </a>
    </li>
  </ul>
</div>
</template>

<script>
import SvgIcon from './icons/SvgIcon'

export default {
  components: { SvgIcon },
  name: 'pagination',
  props: {
    page: Number,
    total: Number,
    perpage: Number,
    last: Number,
    edge: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    pages () {
      if (this.last) {
        return this.last
      }
      if (this.total && this.perpage) {
        return parseInt((this.total - 1) / this.perpage, 10) + 1
      }
      return this.page
    },
    prevPage () {
      if (this.page > 1) {
        return this.page - 1
      }
      return 0
    },
    nextPage () {
      if (this.page < this.pages) {
        return this.page + 1
      }
      return 0
    },
    leftEdge () {
      return (this.page - this.edge) > 3 &&
        this.pages > (this.edge * 2 + 3)
    },
    rightEdge () {
      return (this.pages - this.page - this.edge) > 2 &&
        this.pages > (this.edge * 2 + 3)
    },
    numbers () {
      const rv = []
      let left = 2; let right = this.pages - 1
      if (this.leftEdge) {
        if (this.rightEdge) {
          left = this.page - this.edge
        } else {
          left = Math.max(3, this.pages - 2 * this.edge - 2)
        }
      }
      if (this.rightEdge) {
        if (this.leftEdge) {
          right = this.page + this.edge
        } else {
          right = Math.min(this.pages, 2 * this.edge + 3)
        }
      }
      for (let i = left; i <= right; i++) {
        rv.push(i)
      }
      return rv
    },
  },
  methods: {
    select (num) {
      if (num) {
        this.$emit('select', num)
      }
    },
    selectLeft () {
      this.select(this.page - this.edge - 2)
    },
    selectRight () {
      this.select(this.page + this.edge + 2)
    },
  },
}
</script>

<style>
.pagination ul {
  display: inline-block;
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.pagination ul:after {
  display: table;
  content: '';
  clear: both;
}
.pagination li {
  float: left;
  min-width: 24px;
  text-align: center;
  color: var(--text-hex);
  margin: 0 0.2em;
}
.pagination li._active {
  color: rgb(var(--blue-rgb));
}
.pagination li > a {
  display: inline-block;
  vertical-align: middle;
  color: inherit;
  user-select: none;
  cursor: pointer;
}
.pagination li._disabled > a {
  cursor: not-allowed;
}
.pagination li._disabled svg {
  color: #dadada;
}
.pagination .num {
  font-weight: 600;
}
.pagination .edge {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
@media (max-width: 420px) {
  .pagination li {
    margin: 0 0.1em;
  }
}
@media (max-width: 380px) {
  .pagination li {
    font-size: 14px;
    margin: 0;
  }
}
</style>
