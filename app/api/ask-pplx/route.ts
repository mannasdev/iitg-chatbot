import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.perplexity.ai",
  apiKey: process.env.PPLX_API_KEY,
});

export const POST = async (req: Request) => {
  const request = await req.json();
  try {
    const res = await client.chat.completions.create({
      model: "mixtral-8x7b-instruct",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant created to answer questions related to college fees, course offerings, and details about the third trimester at IITG.",
        },
        {
          role: "system",
          content:
            "If anyone asks something that is not related to college, tell them to ask something related to course",
        },
        {
            role: "system",
            content: "IITG 3rd Trimester courses include DA 109 AI Basics In this course, you will be introduced to the fascinating realm of intelligent agents, problem-solving,logical reasoning, knowledge representation, and some key topics in machine learning. Through practical examples and case studies, you'll gain insights into the power and potential of AI in various applications."
        },
        {
            role: "system",
            content: "IITG 3rd Trimester courses include DA 110 Data Structures This course is your gateway to understanding essential concepts like arrays, stacks, queues, trees, sorting, searching, graphs, and hashing. By mastering these fundamental building blocks, you'll gain the skills needed to efficiently manage and manipulate data, solving complex problems in programming and beyond."
        },
        {
            role: "system",
            content: "DA 111 Algorithm Design & Analysis In this course, you'll delve into the art and science of creating efficient algorithms. From mastering asymptotic notation and complexity analysis to exploring advanced techniques like divide-and-conquer and dynamic programming, you'll gain the skills to solve complex problems systematically. You will gain an understanding of graph algorithms, NP-completeness, and approximation strategies, and equip yourself with the tools to tackle real-world computational challenges."
        },
        {
            role: "system",
            content: "DA 112 Introduction to R In this course, you'll embark on a journey into the heart of data analysis and visualization with R. From the very basics of installation and fundamental operations, you'll progress to working with data types, variables, and essential operations. You will implement loops, functions, and data handling techniques, including importing and exporting data files, and explore the art of data visualization and statistical analysis using R's powerful libraries and tools."
        },
        {
            role: "system",
            content: "The total fees is 26k inr, 8k for R and 6k for others, do not give too much information unless the user specifically asks for it"
        },
        
        {
            role: "user",
            content: request.input 
        }

      ],
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
  }
};
