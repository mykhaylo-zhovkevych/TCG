import { PlayerInfo } from "@/pages/home/board/player-info/PlayerInfo";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";

describe("PlayerInfo", () => {
    it("renders the player hero with health and mana badges", () => {
        render(<PlayerInfo hero={{health: 50, mana: 6}} typePlayer='player' />);

        expect(screen.getByRole('img', {name: 'Hero'})).toBeInTheDocument();
        expect(screen.getByText('50/60')).toBeInTheDocument();
        expect(screen.getByText('6/10')).toBeInTheDocument();
    });
});
