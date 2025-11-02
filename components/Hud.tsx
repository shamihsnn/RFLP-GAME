import React from 'react';
import { InventoryItem, RoomId } from '../types';

const MiniMap: React.FC<{currentRoom: RoomId, unlockedRooms: RoomId[]}> = ({currentRoom, unlockedRooms}) => {
    const rooms: {id: RoomId, name: string, grid: string}[] = [
        {id: 'INTRODUCTION', name: 'Intro', grid: 'col-start-1 row-start-1'},
        {id: 'METHODOLOGY', name: 'Lab', grid: 'col-start-2 row-start-1'},
        {id: 'APPLICATIONS', name: 'Apps', grid: 'col-start-1 row-start-2'},
        {id: 'LIMITATIONS', name: 'Refs', grid: 'col-start-2 row-start-2'}
    ];
    
    const isUnlocked = (id: RoomId) => unlockedRooms.includes(id);

    return (
        <div className="relative w-36 h-28">
            <div className="grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-gray-900/80 border-2 border-blue-400/50 rounded-md w-full h-full">
                {rooms.map(room => {
                    const isCurrent = room.id === currentRoom;
                    const isRoomUnlocked = isUnlocked(room.id);
                    let bgColor = 'bg-gray-700/50';
                    if(isRoomUnlocked) bgColor = 'bg-blue-800/70';
                    
                    return (
                         <div key={room.id} className={`${room.grid} flex items-center justify-center rounded-sm ${bgColor} transition-colors relative`}>
                            <span className={`text-xs font-bold text-white ${!isRoomUnlocked ? 'opacity-30' : ''}`}>
                                {room.name}
                            </span>
                             {isCurrent && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 144 112">
                {isUnlocked('INTRODUCTION') && isUnlocked('METHODOLOGY') && <line x1="36" y1="28" x2="108" y2="28" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2"/>}
                {isUnlocked('METHODOLOGY') && isUnlocked('APPLICATIONS') && <line x1="36" y1="28" x2="36" y2="84" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2"/>}
                {isUnlocked('APPLICATIONS') && isUnlocked('LIMITATIONS') && <line x1="36" y1="84" x2="108" y2="84" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2"/>}
                {isUnlocked('METHODOLOGY') && isUnlocked('LIMITATIONS') && <line x1="108" y1="28" x2="108" y2="84" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 2"/>}
            </svg>
        </div>
    )
}


interface HudProps {
    objective: string;
    inventory: InventoryItem[];
    inventoryIcons: Record<InventoryItem, React.ElementType>;
    currentRoom: RoomId;
    unlockedRooms: RoomId[];
}

const Hud: React.FC<HudProps> = ({ objective, inventory, inventoryIcons, currentRoom, unlockedRooms }) => {
    return (
        <>
            {/* Bottom Left Corner */}
            <div className="absolute bottom-4 left-4 z-[1000]">
                 <MiniMap currentRoom={currentRoom} unlockedRooms={unlockedRooms} />
            </div>


            {/* Objective Panel */}
            <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-80 text-white p-3 rounded-lg border-2 border-blue-400 shadow-lg max-w-xs z-[1000]">
                <h3 className="font-bold text-yellow-300 border-b border-yellow-300 mb-2">Current Objective</h3>
                <p className="text-sm">{objective}</p>
            </div>

            {/* Inventory Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 bg-opacity-80 p-2 rounded-lg border-2 border-blue-400 shadow-lg flex space-x-2 z-[1000]">
                <h3 className="font-bold text-yellow-300 my-auto px-2">Inventory:</h3>
                {inventory.length === 0 ? (
                    <div className="text-gray-400 italic px-2 my-auto">Empty</div>
                ) : (
                    inventory.map(item => {
                        const Icon = inventoryIcons[item];
                        return (
                            <div key={item} className="group relative bg-gray-700 p-2 rounded-md border border-blue-500 hover:bg-blue-500 cursor-pointer">
                                {Icon && <Icon className="w-6 h-6 text-white" />}
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    {item}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default Hud;
