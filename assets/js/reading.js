(() => {
  const body = document.querySelector('.article-body');
  if (!body) return;
  const toc = document.querySelector('.article-toc');
  if (toc) {
    const headings = [...body.querySelectorAll('h2, h3')];
    const list = toc.querySelector('ol');
    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = `section-${index + 1}`;
      const li = document.createElement('li');
      if (heading.tagName === 'H3') li.className = 'subheading';
      const a = document.createElement('a');
      a.href = '#' + encodeURIComponent(heading.id);
      a.textContent = heading.textContent;
      li.append(a);
      list.append(li);
    });
    toc.hidden = headings.length === 0;
    document.querySelector('.reading-page').classList.toggle('has-toc', headings.length > 0);
    const desktop = window.matchMedia('(min-width: 901px)');
    toc.open = desktop.matches;
    desktop.addEventListener('change', event => { toc.open = event.matches; });
  }
  body.querySelectorAll('table').forEach(table => {
    if (table.closest('.highlight')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', '数据表格，可横向滚动');
    table.before(wrapper);
    wrapper.append(table);
  });
})();
