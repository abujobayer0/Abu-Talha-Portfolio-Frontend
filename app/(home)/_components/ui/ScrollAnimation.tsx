"use client";

import { useEffect } from "react";
import $ from "jquery";

const SmoothScrollWrapper: React.FC = () => {
  useEffect(() => {
    // Smooth scroll function
    const handleSmoothScroll = (event: JQuery.ClickEvent) => {
      event.preventDefault();

      const targetId = $(event.currentTarget).attr("href"); // Get the href attribute
      if (targetId) {
        const targetElement = $(targetId);
        if (targetElement.length) {
          $("html, body").animate(
            {
              scrollTop: targetElement.offset()?.top || 0,
            },
            800, // Duration of scroll animation in milliseconds
            "swing", // Easing effect
          );
        }
      }
    };

    // Attach click event to anchor tags with href starting with '#'
    const anchorTags = $('a[href^="#"]');
    anchorTags.on("click", handleSmoothScroll);

    // Cleanup on component unmount
    return () => {
      anchorTags.off("click", handleSmoothScroll);
    };
  }, []);

  return null; // This component only initializes the scroll behavior
};

export default SmoothScrollWrapper;
