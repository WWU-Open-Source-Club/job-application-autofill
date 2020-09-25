const MATCH_LIST = {
  'Address': '3100 Mulberry Ave Apt B307',
  'Address 1': '3100 Mulberry Ave Apt B307',
  'Address Line 1': '3100 Mulberry Ave Apt B307',
  'First Name': 'Joey',
  'Middle Name': 'A',
  'Last Name': 'Lucas',
  'City': 'Bellingham',
  'Postal Code': '98225',
  'Phone Number': '222-222-2222',
  'Job Title': 'Teaching Assistant',
  'Company': 'Western Washington University',
  'Location': 'Bellingham',
  'Country': 'United States',
  'State': 'Washington',
  'State/Province': 'Washington',
  'County': 'Whatcom',
  'Role Description': 'I hosted online labs to help students debug code and \
  graded assignments, including proofs and SQL queries',
  'Employer': 'Western Washington University',
  'Reason for Leaving': 'To focus more on my schoolwork',
  'Skills': 'Javascript',
  'College/University': 'Western Washington University',
  'College': 'Western Washington University',
  'Institution': 'Western Washington University',
  'Program': 'Computer Science'
};


const alreadyEntered = new Map();

function transformTextNodes(node) {
  if(node.nodeName.toLowerCase() === "script" ||
    node.nodeName.toLowerCase() === "style") {
      return;
  }

  if(node.nodeType === Node.TEXT_NODE) {
    let text = node.textContent;
    if(MATCH_LIST[text] !== null  &&  MATCH_LIST[text] !== undefined) {
      console.log("found words: " + text);
      let inputNode = getNearestInputNode(node);
      if (inputNode !== null && inputNode !== undefined
          && !alreadyEntered.has(inputNode)  &&  inputNode.value.length == 0) {
        console.log("found input node for words: " + text + "!  placing value");
        inputNode.value = MATCH_LIST[text];
        alreadyEntered.set(inputNode, true);
      }
    }
  }

  for(const child of node.childNodes) {
    transformTextNodes(child);
  }
}




function getNearestInputNode(node) {
  let parent = node.parentNode;
  let inputNode = inputHelper(parent);
  while ((parent !== null && parent !== undefined)  &&  inputNode === null) {
    parent = parent.parentNode;
    inputNode = inputHelper(parent);
  }
  return inputNode;
}



//recursively searches down tree for input node
function inputHelper(node) {
  if (node.nodeName.toLowerCase() === "input"  ||  node.nodeName.toLowerCase() === "textarea") {
    return node
  }
  let inputNode = null;
  for(const child of node.childNodes) {
    inputNode = inputHelper(child);
    if(inputNode !== null) {
      return inputNode;
    }
  }
  return null;
}




// Log statement to test that the extension loaded properly.
console.log('application autofill loaded!');

function wrapper() {
  console.log("wrapper called");
  transformTextNodes(document.body);
  setTimeout(function(){transformTextNodes(document.body)}, 2000);
}

wrapper();
document.body.addEventListener('click', wrapper);
