import { Client, TextChannel } from "discord.js";
import memberController from '../components/member/member.controller'

export default async function birthday(bot: Client) {
    const channel = await bot.channels.fetch('898585026336280620') as TextChannel;
    return memberController.handlerBirthday(channel);
}

