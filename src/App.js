import React, { useState } from "react";
import "./style.css";
import uuid from "react-uuid";
import { tree } from "./tree";

import {
  FolderIcon,
  DeleteIcon,
  EditIcon,
  FilledFolder,
  FolderNormalIcon
} from "./icons";
import { Test } from "./test";

export default function App() {
  var items = [];
  var depth = 0;

  function handleShowIcons(evt, id) {
    console.log(id);
  }

  function addNewDir(evt, id) {
    debugger;
    console.log(id);
  }

  function insertNewNode(id, type) {
    debugger;
    function recursion(node) {
      console.log(node.name, "--", node.id, "--", node.type);
      if (node.id === id && node.type === "dir") {
        var newNode = { id: uuid(), name: "test", type: type, children: [] };

        node.children.push(newNode);
      }
      if (node.children) {
        node.children.forEach(function (child) {
          recursion(child);
        });
      }
    }

    recursion(tree);
  }

  function expandNode(evt, node) {
    debugger;
    console.log(evt.target.children);
    var visibility = evt.target.parentElement.nextElementSibling.style.display;
    var chidlren = evt.target.parentElement.nextElementSibling;

    switch (visibility) {
      case "none":
        chidlren.style.display = "block";
        evt.target.innerText = " v ";
        break;
      case "block":
        chidlren.style.display = "none";
        evt.target.innerText = " > ";

        break;
      case "":
        chidlren.style.display = "none";
        evt.target.innerText = " v ";

        break;
      default:
        break;
    }

    debugger;
  }

  function handleDirHover(evt, node) {
    // evt.preventDefault();
    // evt.stopPropagation();
    // debugger;
    // evt.target.lastChild.style.display = "inline";
  }

  function buildTree(node, level = 1) {
    if (node.type === "directory") {
      const children = node.children.map((x) => buildTree(x, level + 1));
      // let id = uuid();

      return (
        <div
          id={node.id}
          key={node.id}
          // onMouseEnter={(evt) => handleShowIcons(evt, id)}
          // onMouseLeave={(evt) => hideIcons(evt, id)}
          style={{ paddingLeft: level * 10 }}
          className="dir"
        >
          {/* <FolderNormalIcon /> */}
          <span
            onMouseOver={(evt) => handleDirHover(evt, node)}
            className="dir-heading"
          >
            <span onClick={(evt) => expandNode(evt, node)}> {">"} </span>
            {node.name}
            <span className="icon-container">
              {/* <FolderIcon onClick={addNewDir} /> */}
              <svg
                // onClick={(evt) => insertNodeIntoTree(tree, node.id, node.type)}
                onClick={(evt) => insertNewNode(node.id, node.type)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-folder-plus icon"
                viewBox="0 0 16 16"
              >
                <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
              </svg>
              <EditIcon />
              <DeleteIcon />
            </span>
          </span>
          <div className="children">{children}</div>
        </div>
      );
    } else if (node.type === "file") {
      return (
        <div
          key={uuid()}
          style={{ paddingLeft: level * 10 + 5 }}
          className="file"
        >
          {node.name}
        </div>
      );
    }
  }

  return <div>{buildTree(tree)}</div>;
}
