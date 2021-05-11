function parseFileContent(data) {
    var fileContentAsArray = data.split('\n');

    var parsedFileContent;

    parsedFileContent = fileContentAsArray.map((item) => {
        var itemSplit = item.split('\t');
        var formattedSecondAuthor = JSON.parse(itemSplit[1].replaceAll('\'', '\"'));

        return {
            firstAuthor: itemSplit[0],
            secondAuthor: Object.keys(formattedSecondAuthor).map(key => {
                return {
                    name: key,
                    count: formattedSecondAuthor[key]
                };
            })
        }
    });

    populateDropdown(parsedFileContent);
}

function populateDropdown(parsedFileContent) {
    var dropdown = document.getElementById('dropdown');
    var ul = document.getElementById('list');

    var documentFragment = document.createDocumentFragment();

    parsedFileContent.forEach(item => {
        var li = document.createElement('li');
        var a = document.createElement('a');

        a.className = 'dropdown-item';
        a.href = '#';
        a.innerText = item.firstAuthor;

        a.addEventListener('click', (event) => {
            var results = document.getElementById('results');
            var tbody = document.getElementById('tbody');
            tbody.innerHTML = '';

            var filteredAuthor = parsedFileContent.filter(x => x.firstAuthor === event.target.innerText)[0];

            filteredAuthor.secondAuthor.forEach((author, index) => {
                var tr = document.createElement('tr');
                let tdForSerialNumber = document.createElement('td');
                tdForSerialNumber.innerText = index + 1;
                let tdForName = document.createElement('td');
                tdForName.innerText = author.name;
                let tdForCount = document.createElement('td');
                tdForCount.innerText = author.count;

                tr.appendChild(tdForSerialNumber);
                tr.appendChild(tdForName);
                tr.appendChild(tdForCount);

                tbody.appendChild(tr);
            });

            results.style.display = 'block';
        });

        li.appendChild(a);

        documentFragment.appendChild(li);
    });

    ul.appendChild(documentFragment);

    dropdown.style.display = 'block';
}