import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { connect } from "mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    const { prompt, tags } = await request.json();

    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tags = tags;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to connect to database", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    // const searchPrompt = await Prompt.findById(params.id);
    // if (!searchPrompt)
    //   return new Response("Prompt not found", { status: 4040 });
    // await searchPrompt.remove();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to connect to database", { status: 500 });
  }
};
