/* eslint-disable no-unused-vars */
import React from "react";
import { render, screen, cleanup, waitForElement } from '@testing-library/react'
import Packages from "./Packages";

test('Data for Catering Services', async () => {

    const data = await fetch(`/services/catering`);
    const dt = await data.json();

    for (const singleDt of dt) {
        expect(singleDt._id).toBeTruthy();
    }
});