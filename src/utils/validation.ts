import { z } from "zod";
export const schemaTaskList= z.object({
description:z.string().nonempty("Description is reqiured!"),
title:z.string().nonempty('Title is required!')
});