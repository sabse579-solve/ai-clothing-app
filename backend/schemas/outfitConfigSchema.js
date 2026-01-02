const { z } = require("zod");

const GarmentSchema = z.object({
  garmentType: z.enum([
    "tshirt",
    "shirt",
    "dress",
    "hoodie",
    "jacket",
    "pants",
    "skirt"
  ]),

  color: z.string().regex(/^#([0-9a-fA-F]{6})$/, "Invalid hex color"),

  fabric: z.enum([
    "cotton",
    "denim",
    "silk",
    "wool",
    "linen",
    "polyester"
  ]),

  fitType: z.enum([
    "tight",
    "regular",
    "loose",
    "oversized"
  ]),

  sleeveType: z.enum([
    "sleeveless",
    "short",
    "long"
  ]).optional(),

  necklineType: z.enum([
    "round",
    "v-neck",
    "square",
    "boat",
    "collar"
  ]).optional(),

  lengthType: z.enum([
    "crop",
    "regular",
    "long"
  ]),

  pattern: z.enum([
    "none",
    "stripes",
    "floral",
    "checks",
    "graphic"
  ])
});

module.exports = {
  OutfitConfigSchema: z.object({
    garments: z.array(GarmentSchema).min(1)
  })
};
