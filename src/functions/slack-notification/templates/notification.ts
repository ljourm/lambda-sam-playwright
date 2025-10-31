export const message = `
<h1>こんにちは、<%= userName %>さん</h1>
<ul>
<% items.forEach(item => { %>
  <li><%= item %></li>
<% }); %>
</ul>
`;
