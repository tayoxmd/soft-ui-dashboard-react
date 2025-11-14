// Chakra imports
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useEffect, useRef } from "react";

export default function WorldMap() {
  const mapRef = useRef(null);
  const bgCard = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "white");
  const mapInitialized = useRef(false);

  useEffect(() => {
    const initMap = () => {
      if (
        mapRef.current &&
        window.$ &&
        window.jQuery &&
        window.jQuery.fn.vectorMap &&
        !mapInitialized.current
      ) {
        try {
          const $map = window.jQuery("#world-map");
          if ($map.length > 0 && !$map.data("mapObject")) {
            $map.vectorMap({
              map: "world_mill",
              backgroundColor: "transparent",
              regionStyle: {
                initial: {
                  fill: "#e3eaef",
                  "fill-opacity": 0.8,
                  stroke: "none",
                  "stroke-width": 0,
                  "stroke-opacity": 1,
                },
                hover: {
                  fill: "#4FD1C5",
                  "fill-opacity": 0.8,
                  cursor: "pointer",
                },
                selected: {
                  fill: "#4FD1C5",
                },
                selectedHover: {
                  fill: "#4FD1C5",
                },
              },
              markerStyle: {
                initial: {
                  fill: "#4FD1C5",
                  stroke: "#FFFFFF",
                  "stroke-width": 2,
                  r: 7,
                },
                hover: {
                  fill: "#4FD1C5",
                  stroke: "#FFFFFF",
                  "stroke-width": 2,
                  r: 8,
                },
              },
              markers: [
                { latLng: [41.9, 12.45], name: "Vatican City" },
                { latLng: [43.73, 7.41], name: "Monaco" },
                { latLng: [-0.52, 166.93], name: "Nauru" },
                { latLng: [-8.51, 179.21], name: "Tuvalu" },
                { latLng: [43.93, 12.46], name: "San Marino" },
                { latLng: [47.14, 9.52], name: "Liechtenstein" },
                { latLng: [7.11, 171.06], name: "Marshall Islands" },
                { latLng: [17.3, -62.73], name: "Saint Kitts and Nevis" },
                { latLng: [3.2, 73.22], name: "Maldives" },
                { latLng: [35.88, 14.5], name: "Malta" },
                { latLng: [12.05, -61.75], name: "Grenada" },
                { latLng: [13.16, -61.23], name: "Saint Vincent and the Grenadines" },
                { latLng: [13.16, -59.55], name: "Barbados" },
                { latLng: [17.11, -61.85], name: "Antigua and Barbuda" },
                { latLng: [-4.61, 55.45], name: "Seychelles" },
                { latLng: [7.35, 134.46], name: "Palau" },
                { latLng: [42.5, 1.51], name: "Andorra" },
                { latLng: [14.01, -60.98], name: "Saint Lucia" },
                { latLng: [6.91, 158.18], name: "Federated States of Micronesia" },
                { latLng: [1.3, 103.8], name: "Singapore" },
                { latLng: [1.46, 173.03], name: "Kiribati" },
                { latLng: [-21.13, -175.2], name: "Tonga" },
                { latLng: [15.3, -61.38], name: "Dominica" },
                { latLng: [20.2, 57.5], name: "Mauritius" },
                { latLng: [26.02, 50.55], name: "Bahrain" },
                { latLng: [0.33, 6.73], name: "São Tomé and Príncipe" },
              ],
            });
            mapInitialized.current = true;
          }
        } catch (error) {
          console.error("Error initializing world map:", error);
        }
      }
    };

    // Try to initialize immediately
    initMap();

    // Also try after a short delay to ensure scripts are loaded
    const timeout = setTimeout(() => {
      initMap();
    }, 1000);

    return () => {
      clearTimeout(timeout);
      if (mapInitialized.current && window.jQuery) {
        try {
          window.jQuery("#world-map").vectorMap("remove");
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  return (
    <Card bg={bgCard} p="16px" h="100%">
      <CardHeader p="12px 0px 28px 0px">
        <Text fontSize="lg" fontWeight="bold" color={textColor}>
          World Map
        </Text>
      </CardHeader>
      <CardBody ps="0px" pe="0px" mb="31px" position="relative">
        <Box
          ref={mapRef}
          id="world-map"
          w="100%"
          h="400px"
          style={{ minHeight: "400px" }}
        />
      </CardBody>
    </Card>
  );
}