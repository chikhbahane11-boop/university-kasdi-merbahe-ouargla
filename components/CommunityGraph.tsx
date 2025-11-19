import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CommunityGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;
    
    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", [0, 0, width, height]);

    // Data: Core (Intl Community) connected to entities
    const nodes = [
      { id: "المجتمع الدولي", group: 1, r: 40 },
      { id: "الدول", group: 2, r: 25 },
      { id: "المنظمات الدولية", group: 2, r: 25 },
      { id: "الشركات الكبرى", group: 3, r: 20 },
      { id: "الأفراد", group: 3, r: 20 },
      { id: "حركات التحرر", group: 3, r: 20 },
    ];

    const links = [
      { source: "المجتمع الدولي", target: "الدول" },
      { source: "المجتمع الدولي", target: "المنظمات الدولية" },
      { source: "المجتمع الدولي", target: "الشركات الكبرى" },
      { source: "المجتمع الدولي", target: "الأفراد" },
      { source: "المجتمع الدولي", target: "حركات التحرر" },
    ];

    // Simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => d.r + 5));

    // Draw lines
    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2);

    // Draw circles
    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d: any) => d.r)
      .attr("fill", (d: any) => {
        if (d.group === 1) return "#4f46e5"; // Indigo 600
        if (d.group === 2) return "#0ea5e9"; // Sky 500
        return "#64748b"; // Slate 500
      })
      .call(drag(simulation) as any);

    // Add Labels
    const labels = svg.append("g")
      .attr("class", "texts")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d: any) => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "white")
      .attr("font-size", (d:any) => d.group === 1 ? "14px" : "12px")
      .attr("font-weight", "bold")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
        
      labels
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      
      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      
      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

  }, []);

  return (
    <div className="w-full h-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-inner">
        <svg ref={svgRef}></svg>
    </div>
  );
};

export default CommunityGraph;