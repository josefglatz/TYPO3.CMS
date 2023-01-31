/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
import{html}from"lit";import{renderNodes}from"@typo3/core/lit-helper.js";import*as d3drag from"d3-drag";class DraggableTemplate{static get(e,t){return html`<div class="node-dd node-dd--nodrop">
        <div class="node-dd__ctrl-icon"></div>
        <div class="node-dd__text">
            <span class="node-dd__icon">
                <svg aria-hidden="true" style="width: 16px; height: 16px">
                    <use xlink:ref="${e}"></use>
                </svg>
            </span>
            <span class="node-dd__name">${t}</span>
        </div>
    </div>`}}export var DraggablePositionEnum;!function(e){e.INSIDE="inside",e.BEFORE="before",e.AFTER="after"}(DraggablePositionEnum||(DraggablePositionEnum={}));export class DragDrop{constructor(e){this.timeout={},this.minimalDistance=10,this.tree=e}static setDragStart(){document.querySelectorAll("iframe").forEach((e=>e.style.pointerEvents="none"))}static setDragEnd(){document.querySelectorAll("iframe").forEach((e=>e.style.pointerEvents=""))}connectDragHandler(e){return d3drag.drag().filter((e=>e instanceof MouseEvent)).clickDistance(5).on("start",(function(t){e.onDragStart(t.sourceEvent,t.subject)&&DragDrop.setDragStart()})).on("drag",(function(t){e.onDragOver(t.sourceEvent,t.subject)})).on("end",(function(t){DragDrop.setDragEnd(),e.onDrop(t.sourceEvent,t.subject)}))}createDraggable(e,t){let r=this.tree.svg.node();const o=renderNodes(DraggableTemplate.get(e,t));r.after(...o),this.tree.svg.node().querySelector(".nodes-wrapper")?.classList.add("nodes-wrapper--dragging")}updateDraggablePosition(e){let t=18,r=15;e&&e.pageX&&(t+=e.pageX),e&&e.pageY&&(r+=e.pageY),document.querySelectorAll(".node-dd").forEach((e=>{e.style.top=r+"px",e.style.left=t+"px",e.style.display="block"}))}openNodeTimeout(){null!==this.tree.hoveredNode&&this.tree.hoveredNode.hasChildren&&!this.tree.hoveredNode.expanded?this.timeout.node!=this.tree.hoveredNode&&(this.timeout.node=this.tree.hoveredNode,clearTimeout(this.timeout.time),this.timeout.time=setTimeout((()=>{this.tree.hoveredNode&&(this.tree.showChildren(this.tree.hoveredNode),this.tree.prepareDataForVisibleNodes(),this.tree.updateVisibleNodes())}),1e3)):clearTimeout(this.timeout.time)}addNodeDdClass(e,t){const r=this.tree.svg.node().querySelector(".nodes-wrapper");e&&this.applyNodeClassNames(e,"node-dd--",t),r&&this.applyNodeClassNames(r,"nodes-wrapper--",t),this.tree.settings.canNodeDrag="nodrop"!==t}removeNodeDdClass(){const e=this.tree.svg.node().querySelector(".nodes-wrapper");["nodes-wrapper--nodrop","nodes-wrapper--ok-append","nodes-wrapper--ok-below","nodes-wrapper--ok-between","nodes-wrapper--ok-above","nodes-wrapper--dragging"].forEach((t=>e.classList.remove(t))),this.tree.nodesBgContainer.node().querySelector(".node-bg.node-bg--dragging")?.classList.remove("node-bg--dragging"),this.tree.nodesBgContainer.selectAll(".node-bg__border").style("display","none"),this.tree.svg.node().parentNode.querySelector(".node-dd").remove()}isTheSameNode(e,t){return e&&-1!==e.parentsStateIdentifier.indexOf(t.stateIdentifier)}isDragNodeDistanceMore(e,t){return t.dragStarted||t.startPageX-this.minimalDistance>e.pageX||t.startPageX+this.minimalDistance<e.pageX||t.startPageY-this.minimalDistance>e.pageY||t.startPageY+this.minimalDistance<e.pageY}applyNodeClassNames(e,t,r){["nodrop","ok-append","ok-below","ok-between","ok-above"].forEach((r=>e.classList.remove(t+r))),e.classList.add(t+r)}}