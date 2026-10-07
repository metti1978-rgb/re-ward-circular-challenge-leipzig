import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScreenId } from '../../types';
import { ArrowUpRight, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface RaupeGameScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

interface Vec {
  x: number;
  y: number;
}

type TrashKind = 'can' | 'bottle' | 'peel' | 'paper' | 'bag' | 'box' | 'cup';

interface Trash extends Vec {
  kind: TrashKind;
}

interface Game {
  body: Vec[];
  dir: Vec;
  queue: Vec[];
  trash: Trash | null;
  score: number;
  collected: number;
}

type Status = 'idle' | 'running' | 'over';

const COLS = 16;
const ROWS = 16;
const CELL = 30;
const SIZE = COLS * CELL;
const TRASH_KINDS: TrashKind[] = ['can', 'bottle', 'peel', 'paper', 'bag', 'box', 'cup'];

const INK = '#111827';
const ORANGE = '#F07E26';
const YELLOW = '#FED27A';
const CREAM = '#FFF6A6';
const HIGHSCORE_KEY = 'reward_raupe_highscore_v1';

const UP: Vec = { x: 0, y: -1 };
const DOWN: Vec = { x: 0, y: 1 };
const LEFT: Vec = { x: -1, y: 0 };
const RIGHT: Vec = { x: 1, y: 0 };

const tagClass = 'font-condensed text-label font-semibold uppercase tracking-wide corner-cut';

const rect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string, r = 0) => {
  ctx.fillStyle = fill;
  ctx.beginPath();
  if (r > 0 && 'roundRect' in ctx) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
  ctx.fill();
};

// Flache Müll-Icons in den Markenfarben (Tinte, Orange, Gelb), ohne Kontur — Mittelpunkt (cx, cy).
const drawTrash = (ctx: CanvasRenderingContext2D, kind: TrashKind, cx: number, cy: number) => {
  switch (kind) {
    case 'can':
      rect(ctx, cx - 7, cy - 9, 14, 18, INK, 2);
      rect(ctx, cx - 7, cy - 3, 14, 6, ORANGE);
      rect(ctx, cx - 7.5, cy - 11, 15, 3, YELLOW, 1.5);
      break;
    case 'bottle':
      rect(ctx, cx - 2.5, cy - 10, 5, 9, INK, 1);
      rect(ctx, cx - 5.5, cy - 4, 11, 15, INK, 3);
      rect(ctx, cx - 3, cy - 13, 6, 3.5, ORANGE, 1);
      rect(ctx, cx - 5.5, cy + 1, 11, 5, YELLOW);
      break;
    case 'peel':
      ctx.fillStyle = YELLOW;
      ctx.beginPath();
      ctx.arc(cx, cy - 3, 11.5, Math.PI * 0.12, Math.PI * 0.88);
      ctx.arc(cx, cy - 8, 9, Math.PI * 0.88, Math.PI * 0.12, true);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = INK;
      for (const sx of [-1, 1]) {
        ctx.beginPath();
        ctx.arc(cx + sx * 10.3, cy + 1.6, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    case 'paper':
      rect(ctx, cx - 9, cy - 10, 18, 20, CREAM, 2);
      rect(ctx, cx - 6, cy - 7, 12, 3, INK);
      rect(ctx, cx - 6, cy - 1, 12, 2, INK);
      rect(ctx, cx - 6, cy + 3, 12, 2, INK);
      rect(ctx, cx - 6, cy + 7, 7, 2, INK);
      break;
    case 'bag':
      ctx.fillStyle = ORANGE;
      ctx.beginPath();
      ctx.moveTo(cx - 9, cy - 4);
      ctx.lineTo(cx + 9, cy - 4);
      ctx.lineTo(cx + 7, cy + 10);
      ctx.lineTo(cx - 7, cy + 10);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = INK;
      ctx.lineWidth = 2;
      for (const sx of [-1, 1]) {
        ctx.beginPath();
        ctx.arc(cx + sx * 4.5, cy - 4, 4, Math.PI, Math.PI * 2);
        ctx.stroke();
      }
      break;
    case 'box':
      rect(ctx, cx - 9, cy - 8, 18, 17, ORANGE, 1.5);
      rect(ctx, cx - 9, cy - 8, 18, 4, INK, 1.5);
      rect(ctx, cx - 2.5, cy - 8, 5, 17, YELLOW);
      break;
    case 'cup':
      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.moveTo(cx - 7, cy - 6);
      ctx.lineTo(cx + 7, cy - 6);
      ctx.lineTo(cx + 5, cy + 10);
      ctx.lineTo(cx - 5, cy + 10);
      ctx.closePath();
      ctx.fill();
      rect(ctx, cx - 5.6, cy + 1, 11.2, 4, ORANGE);
      rect(ctx, cx - 8, cy - 9, 16, 3.5, YELLOW, 1.5);
      ctx.strokeStyle = ORANGE;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx + 2, cy - 9);
      ctx.lineTo(cx + 5, cy - 15);
      ctx.stroke();
      break;
  }
};

const spawnTrash = (body: Vec[]): Trash | null => {
  const taken = new Set(body.map((b) => `${b.x},${b.y}`));
  const free: Vec[] = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (!taken.has(`${x},${y}`)) free.push({ x, y });
    }
  }
  if (free.length === 0) return null;
  const cell = free[Math.floor(Math.random() * free.length)];
  return { ...cell, kind: TRASH_KINDS[Math.floor(Math.random() * TRASH_KINDS.length)] };
};

const createGame = (): Game => {
  const body = [
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 },
  ];
  return { body, dir: RIGHT, queue: [], trash: spawnTrash(body), score: 0, collected: 0 };
};

const tickDelay = (collected: number) => Math.max(70, 150 - collected * 4);

export const RaupeGameScreen: React.FC<RaupeGameScreenProps> = ({ onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(createGame());
  const statusRef = useRef<Status>('idle');
  const timerRef = useRef<number | null>(null);
  const highRef = useRef(0);
  const touchRef = useRef<Vec | null>(null);

  const [status, setStatus] = useState<Status>('idle');
  const [score, setScore] = useState(0);
  const [collected, setCollected] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const g = gameRef.current;

    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== SIZE * dpr) {
      canvas.width = SIZE * dpr;
      canvas.height = SIZE * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? '#FFFFFF' : '#F4F5F7';
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      }
    }

    if (g.trash) {
      drawTrash(ctx, g.trash.kind, g.trash.x * CELL + CELL / 2, g.trash.y * CELL + CELL / 2);
    }

    for (let i = g.body.length - 1; i >= 0; i--) {
      const seg = g.body[i];
      const cx = seg.x * CELL + CELL / 2;
      const cy = seg.y * CELL + CELL / 2;
      const isHead = i === 0;
      ctx.beginPath();
      ctx.arc(cx, cy, CELL * (isHead ? 0.47 : 0.4), 0, Math.PI * 2);
      ctx.fillStyle = isHead ? '#F07E26' : i % 2 === 0 ? '#F07E26' : '#FED27A';
      ctx.fill();

      if (isHead) {
        const d = g.dir;
        const perp = { x: -d.y, y: d.x };
        // Fühler
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#111827';
        for (const s of [-1, 1]) {
          const bx = cx + d.x * CELL * 0.3 + perp.x * CELL * 0.14 * s;
          const by = cy + d.y * CELL * 0.3 + perp.y * CELL * 0.14 * s;
          const tx = cx + d.x * CELL * 0.66 + perp.x * CELL * 0.3 * s;
          const ty = cy + d.y * CELL * 0.66 + perp.y * CELL * 0.3 * s;
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(tx, ty);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(tx, ty, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#111827';
          ctx.fill();
        }
        // Augen
        for (const s of [-1, 1]) {
          const ex = cx + d.x * CELL * 0.12 + perp.x * CELL * 0.2 * s;
          const ey = cy + d.y * CELL * 0.12 + perp.y * CELL * 0.2 * s;
          ctx.beginPath();
          ctx.arc(ex, ey, CELL * 0.13, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
          ctx.beginPath();
          ctx.arc(ex + d.x * 2, ey + d.y * 2, CELL * 0.065, 0, Math.PI * 2);
          ctx.fillStyle = '#111827';
          ctx.fill();
        }
      }
    }
  }, []);

  const endGame = useCallback(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    statusRef.current = 'over';
    setStatus('over');
    const finalScore = gameRef.current.score;
    if (finalScore > highRef.current) {
      highRef.current = finalScore;
      setHighScore(finalScore);
      try {
        localStorage.setItem(HIGHSCORE_KEY, String(finalScore));
      } catch {
        // Speichern nicht möglich (z. B. privater Modus) — egal.
      }
    }
  }, []);

  const tick = useCallback(() => {
    const g = gameRef.current;
    const dir = g.queue.shift() ?? g.dir;
    g.dir = dir;
    const head = { x: g.body[0].x + dir.x, y: g.body[0].y + dir.y };
    const ate = !!g.trash && head.x === g.trash.x && head.y === g.trash.y;

    const outside = head.x < 0 || head.y < 0 || head.x >= COLS || head.y >= ROWS;
    const checkAgainst = ate ? g.body : g.body.slice(0, -1);
    const hitSelf = checkAgainst.some((b) => b.x === head.x && b.y === head.y);
    if (outside || hitSelf) {
      draw();
      endGame();
      return;
    }

    g.body.unshift(head);
    if (ate) {
      g.score += 10;
      g.collected += 1;
      g.trash = spawnTrash(g.body);
      setScore(g.score);
      setCollected(g.collected);
    } else {
      g.body.pop();
    }
    draw();

    if (!g.trash) {
      endGame();
      return;
    }
    timerRef.current = window.setTimeout(tick, tickDelay(g.collected));
  }, [draw, endGame]);

  const startGame = useCallback(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    gameRef.current = createGame();
    statusRef.current = 'running';
    setStatus('running');
    setScore(0);
    setCollected(0);
    draw();
    timerRef.current = window.setTimeout(tick, tickDelay(0));
  }, [draw, tick]);

  const turn = useCallback((next: Vec) => {
    if (statusRef.current !== 'running') return;
    const g = gameRef.current;
    const last = g.queue[g.queue.length - 1] ?? g.dir;
    const isReverse = next.x === -last.x && next.y === -last.y;
    const isSame = next.x === last.x && next.y === last.y;
    if (isReverse || isSame || g.queue.length >= 2) return;
    g.queue.push(next);
  }, []);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(HIGHSCORE_KEY));
      if (Number.isFinite(saved) && saved > 0) {
        highRef.current = saved;
        setHighScore(saved);
      }
    } catch {
      // ignorieren
    }
    draw();
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [draw]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Vec> = {
        ArrowUp: UP,
        w: UP,
        W: UP,
        ArrowDown: DOWN,
        s: DOWN,
        S: DOWN,
        ArrowLeft: LEFT,
        a: LEFT,
        A: LEFT,
        ArrowRight: RIGHT,
        d: RIGHT,
        D: RIGHT,
      };
      if (map[e.key]) {
        e.preventDefault();
        turn(map[e.key]);
      } else if ((e.key === ' ' || e.key === 'Enter') && statusRef.current !== 'running') {
        e.preventDefault();
        startGame();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [turn, startGame]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? RIGHT : LEFT);
    else turn(dy > 0 ? DOWN : UP);
  };

  const padButton =
    'w-14 h-14 flex items-center justify-center border border-[#111827] corner-cut bg-white text-[#111827] active:bg-[#F07E26] active:text-white transition-colors cursor-pointer select-none';

  return (
    <section
      className="w-full py-14 sm:py-20 px-3 sm:px-6"
      style={{ background: 'linear-gradient(105deg, #FFFFFF 0%, #FFFFFF 66%, #EFEDE6 100%)' }}
    >
      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        <span className={`${tagClass} text-[#F07E26]`}>GIMMICK</span>
        <h2 className="uppercase text-[#111827] text-h2 mb-3">Raupe räumt auf</h2>
        <p className="text-body text-[#111827] leading-relaxed mb-8">
          Hilf der Raupe, den Müll einzusammeln. Jedes Teil bringt 10 Punkte — und die Raupe wird länger und schneller.
          Steuerung mit Pfeiltasten oder WASD, am Handy per Wischen.
        </p>

        <div className="flex items-center justify-between w-full max-w-[480px] mb-3">
          <div className={`${tagClass} text-[#111827]`}>
            Punkte <span className="text-[#F07E26] text-h6 align-middle ml-1">{score}</span>
          </div>
          <div className={`${tagClass} text-[#111827]`}>
            Rekord <span className="text-[#F07E26] text-h6 align-middle ml-1">{highScore}</span>
          </div>
        </div>

        <div
          className="relative w-full max-w-[480px] aspect-square border border-[#111827] corner-cut overflow-hidden touch-none select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <canvas ref={canvasRef} className="block w-full h-full" aria-label="Spielfeld der Raupe" />

          {status !== 'running' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/85 p-6">
              {status === 'over' ? (
                <>
                  <div className="uppercase text-[#111827] text-h3 font-semibold">Game over</div>
                  <p className="text-body text-[#111827]">
                    {collected} Teile Müll eingesammelt — {score} Punkte.
                  </p>
                </>
              ) : (
                <div className="uppercase text-[#111827] text-h3 font-semibold">Bereit?</div>
              )}
              <button onClick={startGame} className="btn-editorial-primary cursor-pointer">
                <span>{status === 'over' ? 'Nochmal' : 'Spiel starten'}</span>
              </button>
              <span className="text-label text-[#111827] font-condensed">oder Leertaste</span>
            </div>
          )}
        </div>

        <div className="md:hidden mt-6 grid grid-cols-3 gap-2 place-items-center">
          <span />
          <button aria-label="Hoch" className={padButton} onPointerDown={() => turn(UP)}>
            <ArrowUp className="w-6 h-6" />
          </button>
          <span />
          <button aria-label="Links" className={padButton} onPointerDown={() => turn(LEFT)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button aria-label="Runter" className={padButton} onPointerDown={() => turn(DOWN)}>
            <ArrowDown className="w-6 h-6" />
          </button>
          <button aria-label="Rechts" className={padButton} onPointerDown={() => turn(RIGHT)}>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        <button onClick={() => onNavigate('overview')} className="btn-editorial-link mt-10 cursor-pointer">
          <span>Zurück zur Startseite</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
